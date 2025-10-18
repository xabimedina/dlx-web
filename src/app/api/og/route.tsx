import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const title = searchParams.get('title') || 'Despeja la X';
    const subtitle = searchParams.get('subtitle') || 'Estudio de Arquitectura e Interiorismo';
    const type = searchParams.get('type') || 'default';

    // Configuración de colores según el tipo
    const colors = {
      default: {
        bg: '#F4F3F1',
        primary: '#1A1A1A',
        secondary: '#666666',
      },
      project: {
        bg: '#1A1A1A',
        primary: '#F4F3F1',
        secondary: '#CCCCCC',
      },
    };

    const currentColors = colors[type as keyof typeof colors] || colors.default;

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: currentColors.bg,
            padding: '80px',
          }}
        >
          {/* Logo o marca */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                fontSize: '60px',
                fontWeight: 'bold',
                color: currentColors.primary,
                letterSpacing: '-0.05em',
                fontFamily: 'system-ui',
              }}
            >
              DESPEJA LA X
            </div>
          </div>

          {/* Título principal */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              maxWidth: '1000px',
            }}
          >
            <h1
              style={{
                fontSize: title.length > 50 ? '60px' : '80px',
                fontWeight: 'bold',
                color: currentColors.primary,
                margin: '0',
                padding: '0 40px',
                lineHeight: 1.2,
                fontFamily: 'system-ui',
              }}
            >
              {title}
            </h1>
            
            {subtitle && (
              <p
                style={{
                  fontSize: '36px',
                  color: currentColors.secondary,
                  margin: '30px 0 0 0',
                  fontFamily: 'system-ui',
                }}
              >
                {subtitle}
              </p>
            )}
          </div>

          {/* Decoración inferior */}
          <div
            style={{
              position: 'absolute',
              bottom: '60px',
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <div
              style={{
                width: '60px',
                height: '4px',
                backgroundColor: currentColors.primary,
              }}
            />
            <span
              style={{
                fontSize: '24px',
                color: currentColors.secondary,
                fontFamily: 'system-ui',
              }}
            >
              www.despejalax.es
            </span>
            <div
              style={{
                width: '60px',
                height: '4px',
                backgroundColor: currentColors.primary,
              }}
            />
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e) {
    console.error('Error generating OG image:', e);
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}
