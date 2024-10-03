import { NextRequest } from "next/server";
import { ImageResponse } from "next/og";

// Pretendard 폰트 URL
const pretendardFontUrl =
  "https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/woff2/Pretendard-Regular.woff2";

// 폰트 파일을 로드하는 함수
async function loadFont() {
  const fontData = await fetch(pretendardFontUrl).then((res) =>
    res.arrayBuffer()
  );
  return fontData;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "Title";
  const description = searchParams.get("description") || "Default Description";

  const fontData = await loadFont();

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "column",
          backgroundImage: "linear-gradient(110deg, #f5f5f4, #dbeafe)",
          fontSize: 60,
          letterSpacing: -2,
          fontWeight: "700",
          textAlign: "center",
          position: "relative",
          fontFamily: "Pretendard",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 26,
            left: 40,
            display: "flex",
            flexDirection: "column",
            color: "#0a0a0a",
            fontWeight: "700",
          }}
        >
          <span style={{ fontSize: 38 }}>Geon</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            padding: "0px 40px",
            paddingTop: "80px",
            margin: "0 0",
            maxWidth: "1050px",
            minWidth: "100%",
            borderBottomLeftRadius: "18px",
            textAlign: "left",
            color: "#0a0a0a",
            lineHeight: "1.4",
            fontSize: 50,
            fontWeight: "bold",
          }}
        >
          {title}
        </div>
        <div
          style={{
            color: "#0a0a0a",
            fontWeight: 600,
            left: 40,
            bottom: 26,
            textAlign: "left",
            position: "absolute",
            fontSize: 35,
            lineHeight: "1.75rem",
          }}
        >
          {description}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
