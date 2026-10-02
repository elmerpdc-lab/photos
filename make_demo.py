"""Build demo.json from the local Photos folder so the dashboard can be previewed with ?demo.

Reads only names, sizes and modified dates - OneDrive placeholder files are not downloaded.
GPS is read (with Pillow, if installed) only from photos already stored on this PC.
demo.json lists your real file names, so keep it private: don't upload it with the website.
"""
import ctypes
import json
import os
import sys
from datetime import datetime, timezone

try:
    from PIL import Image
except ImportError:
    Image = None

CLOUD_ONLY = 0x400000 | 0x1000   # FILE_ATTRIBUTE_RECALL_ON_DATA_ACCESS | FILE_ATTRIBUTE_OFFLINE


def is_local(path):
    if os.name != 'nt':
        return True
    return not ctypes.windll.kernel32.GetFileAttributesW(path) & CLOUD_ONLY


def read_gps(path):
    """[lat, lon] from EXIF for files already on disk, else [None, None]."""
    if Image is None or not path.lower().endswith(('.jpg', '.jpeg')) or not is_local(path):
        return [None, None]
    try:
        g = Image.open(path).getexif().get_ifd(0x8825)
        dms = lambda v: float(v[0]) + float(v[1]) / 60 + float(v[2]) / 3600
        lat, lon = dms(g[2]), dms(g[4])
        if g.get(1) == 'S':
            lat = -lat
        if g.get(3) == 'W':
            lon = -lon
        return [round(lat, 4), round(lon, 4)] if (lat or lon) else [None, None]
    except Exception:
        return [None, None]


ROOT = sys.argv[1] if len(sys.argv) > 1 else r'C:\Users\elmer\OneDrive\EEE\Photos'
SKIP_TOP = {'Catalogs', 'Lightroom Presets'}
EXT = set('jpg jpeg png gif webp bmp tif tiff heic heif cr2 cr3 nef arw dng orf rw2 raf '
          'mp4 mov m4v avi 3gp mkv wmv mpg mpeg webm'.split())

rows = []
root = os.path.abspath(ROOT)
for dirpath, dirnames, filenames in os.walk(root):
    rel = os.path.relpath(dirpath, root).replace('\\', '/')
    rel = '' if rel == '.' else rel
    dirnames[:] = [d for d in dirnames
                   if not d.lower().endswith('.lrdata') and not d.startswith('.')
                   and not (rel == '' and d in SKIP_TOP)]
    for name in filenames:
        if name.rsplit('.', 1)[-1].lower() not in EXT:
            continue
        path = os.path.join(dirpath, name)
        st = os.stat(path)
        mod = datetime.fromtimestamp(st.st_mtime, timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')
        rows.append([f'd{len(rows)}', name, rel, st.st_size, '', mod, '', 0, 0, 0, *read_gps(path)])

out = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'demo.json')
with open(out, 'w', encoding='utf-8') as f:
    json.dump(rows, f, separators=(',', ':'))
print(f'{len(rows)} items -> {out}')

# Files tab preview: every file in EEE except the photo folders (names, sizes and dates only)
EEE = os.path.abspath(os.path.join(root, '..'))
files = []
for dirpath, dirnames, filenames in os.walk(EEE):
    rel = os.path.relpath(dirpath, EEE).replace(os.sep, '/')
    rel = '' if rel == '.' else rel
    dirnames[:] = [d for d in dirnames if not d.startswith('.') and not (rel == '' and d in ('Photos', 'Photos-Priv'))]
    for name in filenames:
        if name.startswith('.'):
            continue
        st = os.stat(os.path.join(dirpath, name))
        files.append([f'f{len(files)}', name, rel, st.st_size,
                      datetime.fromtimestamp(st.st_mtime, timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')])
out = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'demo-files.json')
with open(out, 'w', encoding='utf-8') as f:
    json.dump(files, f, separators=(',', ':'))
print(f'{len(files)} files -> {out}')
