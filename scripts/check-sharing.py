"""Read-only crawler verification: python3 scripts/check-sharing.py [base URL]."""
import concurrent.futures
import json
import struct
import sys
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from html.parser import HTMLParser

BASE = (sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3017").rstrip("/")
CANONICAL = "https://www.kliqnetdigital.com"
FACEBOOK = "facebookexternalhit/1.1"


def get(path, agent=FACEBOOK):
    request = urllib.request.Request(BASE + path, headers={"User-Agent": agent})
    with urllib.request.urlopen(request, timeout=40) as response:
        assert response.status == 200, (path, response.status)
        return response.read(), response.headers.get_content_type()


class Head(HTMLParser):
    def __init__(self):
        super().__init__()
        self.meta = {}
        self.links = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "meta":
            key = attrs.get("property", attrs.get("name"))
            if key:
                self.meta.setdefault(key, []).append(attrs.get("content"))
        if tag == "link":
            self.links.append(attrs)


def page(path, agent=FACEBOOK):
    raw, content_type = get(path, agent)
    assert content_type == "text/html", (path, content_type)
    head = Head()
    # Crawlers must get metadata in the initial head, without running JavaScript.
    head.feed(raw.decode().split("</head>", 1)[0])
    for key in ["og:title", "og:description", "og:url", "og:type", "og:site_name", "og:locale", "og:image", "og:image:secure_url", "og:image:width", "og:image:height", "og:image:type", "og:image:alt", "twitter:card", "twitter:image"]:
        assert len(head.meta.get(key, [])) == 1 and head.meta[key][0], (path, agent, key, head.meta.get(key))
    meta = {key: values[0] for key, values in head.meta.items()}
    assert meta["og:url"].rstrip("/") == (CANONICAL + path).rstrip("/"), (path, meta["og:url"])
    assert meta["og:image"] == meta["og:image:secure_url"] == meta["twitter:image"]
    assert meta["og:image"].startswith(CANONICAL + "/share/")
    assert (meta["og:image:width"], meta["og:image:height"], meta["og:image:type"]) == ("1200", "630", "image/png")
    assert meta["twitter:card"] == "summary_large_image"
    assert meta["og:type"] == ("article" if path.startswith("/blog/") else "website")
    icons = [link["href"] for link in head.links if link.get("rel") in ["icon", "apple-touch-icon", "shortcut icon"]]
    assert "/icons/kliqnet-20260916.svg" in icons, (path, icons)
    assert "/icons/kliqnet-32-20260916.png" in icons
    assert "/icons/kliqnet-180-20260916.png" in icons
    return {"path": path, "image": meta["og:image"], "icons": icons}


def image_asset(path):
    raw, content_type = get(path)
    if path.endswith(".png"):
        assert content_type == "image/png" and raw[:8] == b"\x89PNG\r\n\x1a\n", path
        dimensions = struct.unpack(">II", raw[16:24])
        if path.startswith("/share/"):
            assert dimensions == (1200, 630) and len(raw) < 1_000_000, (path, dimensions, len(raw))
    elif ".ico" in path:
        assert struct.unpack("<HHH", raw[:6]) == (0, 1, 3), path
    elif path.endswith(".svg"):
        assert content_type == "image/svg+xml" and b"Kliqnet" in raw, path
    return path


def main():
    sitemap, _ = get("/sitemap.xml")
    root = ET.fromstring(sitemap)
    paths = [urllib.parse.urlsplit(node.text).path or "/" for node in root.findall(".//{*}loc")]
    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:
        pages = list(pool.map(page, paths))
        assets = {urllib.parse.urlsplit(result["image"]).path for result in pages}
        assets.update(icon for result in pages for icon in result["icons"])
        manifest, _ = get("/manifest.webmanifest")
        assets.update(icon["src"] for icon in json.loads(manifest)["icons"])
        checked = list(pool.map(image_asset, sorted(assets)))
    for agent in ["WhatsApp/2.24.1", "Twitterbot/1.0", "LinkedInBot/1.0"]:
        for path in ["/", "/projects/crate-companion", "/blog/a-restaurant-website-is-a-guest-journey"]:
            page(path, agent)
    print(json.dumps({"base": BASE, "pages": len(pages), "assets": len(checked), "additional_bot_page_checks": 9, "result": "PASS"}, indent=2))


if __name__ == "__main__":
    main()
