import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export const alt = 'DummyShop';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#0070f3',
        }}
      >
        DummyShop
      </div>
    ),
    {
      ...size,
    }
  );
}
