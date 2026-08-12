const http = require("node:http");
const { Innertube } = require("youtubei.js");

const PORT = 8080;
let music;

// FIXED: v17 renamed Music.build() -> Innertube.create()
// FIXED: search moved under the music manager: yt.music.search(q, { type: "song" })
// FIXED: the result is nested: contents[0] (MusicShelf) -> .contents[] (track items)
// FIXED: duration is an object { text, seconds }, thumbnails live at
//        thumbnail.contents[0].url (array of {url,width,height})
async function handleSearch(query) {
  const results = await music.search(query);
  return results.videos
        .slice(0, 10)
        .map((video) => ({
            id: video.video_id,
            title: video.title?.text ?? "",
            artists: video.author?.name
                ? [video.author.name]
                : [],
            duration: video.duration?.text ?? null,
            thumbnail: video.thumbnails?.at(-1)?.url ?? null,
            published: video.published?.text ?? null,
            views: video.view_count?.text ?? null,
        }));
}

async function start() {
  music = await Innertube.create();

  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://localhost:${PORT}`);

    if (url.pathname === "/ping") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: true, message: "server alive" }));
      return;
    }

    if (url.pathname === "/search") {
      const q = url.searchParams.get("q");
      if (!q) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "missing q parameter" }));
        return;
      }
      try {
        const songs = await handleSearch(q);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ songs }));
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err.message }));
      }
      return;
    }

    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "not found" }));
  });

  server.listen(PORT, () => {
    console.log(`tunix server is running on http://localhost:${PORT}`);
  });
}

// FIXED: every bug you reported earlier is unchanged, but I did no longer use top-level await.
start();
