"""One-time import of the owner's Figma assets. Runtime is fully self-hosted."""
import concurrent.futures, json, pathlib, re, subprocess

root = pathlib.Path(__file__).resolve().parents[1]
downloads = {}
for file in (root / 'src').glob('*.jsx'):
    code = file.read_text(encoding='utf-8')
    prefix = re.search(r'const assetPathPrefix = "(https://www.figma.com/api/mcp/asset/([^"]+))";', code)
    if not prefix:
        continue
    origin, namespace = prefix.groups()
    for filename in re.findall(r'\$\{assetPathPrefix\}/([^`]+)', code):
        target = root / 'assets' / namespace / filename
        downloads[str(target)] = origin + '/' + filename
    code = code.replace(origin, './assets/' + namespace)
    file.write_text(code, encoding='utf-8')

def download(item):
    name, url = item
    file = pathlib.Path(name)
    file.parent.mkdir(parents=True, exist_ok=True)
    if file.is_file() and file.stat().st_size > 0:
        return
    subprocess.run(['curl.exe', '-L', '--fail', '--silent', '--show-error', '--retry', '2', '-o', name, url],
                   check=True, creationflags=getattr(subprocess, 'CREATE_NO_WINDOW', 0))
    if file.stat().st_size == 0:
        raise ValueError('Empty Figma asset: ' + name)

with concurrent.futures.ThreadPoolExecutor(max_workers=10) as pool:
    list(pool.map(download, downloads.items()))
(root / 'asset-downloads.json').write_text(json.dumps(downloads, indent=2), encoding='utf-8')
print('Localized', len(downloads), 'Figma assets')
