import { ImageResponse } from "next/og";

export const alt = "Taha Shalaby. AI engineer. Educator.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadDisplayFont(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500",
      { headers: { "User-Agent": "Mozilla/5.0 (compatible; font-fetch)" } }
    ).then((res) => res.text());
    const url = css.match(/src: url\((https:[^)]+\.ttf)\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((res) => res.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const displayFont = await loadDisplayFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fbfbf9",
          color: "#22222a",
          padding: "72px 80px",
          fontFamily: displayFont ? "Cormorant Garamond" : "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 110,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <span>AI engineer.</span>
              <div
                style={{
                  width: 26,
                  height: 26,
                  background: "#3247c5",
                  marginLeft: 36,
                  marginTop: 18,
                }}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span>Educator.</span>
              <div
                style={{
                  width: 26,
                  height: 26,
                  background: "#b0562b",
                  marginLeft: 36,
                  marginTop: 18,
                }}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid #d9d9d4",
            paddingTop: 32,
            fontSize: 32,
          }}
        >
          <span>Taha Shalaby</span>
          <span style={{ color: "#6b6b74", fontSize: 26 }}>
            tahashalaby93@gmail.com
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: displayFont
        ? [
            {
              name: "Cormorant Garamond",
              data: displayFont,
              weight: 500,
              style: "normal",
            },
          ]
        : undefined,
    }
  );
}
