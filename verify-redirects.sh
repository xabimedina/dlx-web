#!/bin/bash

# Script de verificación de redirecciones de dominio
# despejalax.com → despejalax.es

echo "🔍 Verificando redirecciones de dominio..."
echo "=========================================="
echo ""

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para verificar redirección
check_redirect() {
    local url=$1
    local expected=$2
    
    echo -n "Probando: $url ... "
    
    # Obtener Location header
    location=$(curl -s -o /dev/null -w '%{redirect_url}' -L "$url")
    
    if [[ "$location" == *"$expected"* ]]; then
        echo -e "${GREEN}✓ OK${NC} → $location"
        return 0
    else
        echo -e "${RED}✗ FAIL${NC} → $location"
        echo "   Esperado: $expected"
        return 1
    fi
}

# Verificar redirecciones
echo "📍 Verificando redirecciones HTTP → HTTPS:"
echo "-------------------------------------------"
check_redirect "http://despejalax.com" "https://www.despejalax.es"
check_redirect "http://www.despejalax.com" "https://www.despejalax.es"
check_redirect "http://despejalax.es" "https://www.despejalax.es"
check_redirect "http://www.despejalax.es" "https://www.despejalax.es"

echo ""
echo "📍 Verificando redirecciones HTTPS:"
echo "-------------------------------------------"
check_redirect "https://despejalax.com" "https://www.despejalax.es"
check_redirect "https://www.despejalax.com" "https://www.despejalax.es"
check_redirect "https://despejalax.es" "https://www.despejalax.es"

echo ""
echo "📍 Verificando rutas específicas:"
echo "-------------------------------------------"
check_redirect "https://despejalax.com/proyectos" "https://www.despejalax.es/proyectos"
check_redirect "https://www.despejalax.com/proyectos" "https://www.despejalax.es/proyectos"

echo ""
echo "📍 Verificando sitemap y robots.txt:"
echo "-------------------------------------------"

# Verificar sitemap
echo -n "Verificando sitemap.xml ... "
sitemap_content=$(curl -s "https://www.despejalax.es/sitemap.xml")
if [[ "$sitemap_content" == *"despejalax.es"* ]]; then
    echo -e "${GREEN}✓ OK${NC} - Contiene el dominio correcto"
else
    echo -e "${RED}✗ FAIL${NC} - No contiene despejalax.es"
fi

# Verificar robots.txt
echo -n "Verificando robots.txt ... "
robots_content=$(curl -s "https://www.despejalax.es/robots.txt")
if [[ "$robots_content" == *"despejalax.es"* ]]; then
    echo -e "${GREEN}✓ OK${NC} - Contiene el dominio correcto"
else
    echo -e "${RED}✗ FAIL${NC} - No contiene despejalax.es"
fi

echo ""
echo "📍 Verificando SSL:"
echo "-------------------------------------------"

# Verificar SSL para .es
echo -n "SSL para www.despejalax.es ... "
ssl_es=$(curl -s -o /dev/null -w '%{http_code}' "https://www.despejalax.es")
if [ "$ssl_es" == "200" ]; then
    echo -e "${GREEN}✓ OK${NC} (HTTP $ssl_es)"
else
    echo -e "${RED}✗ FAIL${NC} (HTTP $ssl_es)"
fi

# Verificar SSL para .com (debe redirigir)
echo -n "SSL para www.despejalax.com ... "
ssl_com=$(curl -s -o /dev/null -w '%{http_code}' -L "https://www.despejalax.com")
if [ "$ssl_com" == "200" ]; then
    echo -e "${GREEN}✓ OK${NC} (HTTP $ssl_com)"
else
    echo -e "${RED}✗ FAIL${NC} (HTTP $ssl_com)"
fi

echo ""
echo "📍 Verificando meta tags:"
echo "-------------------------------------------"

# Verificar Open Graph URL
echo -n "Open Graph URL ... "
og_url=$(curl -s "https://www.despejalax.es" | grep -o 'property="og:url" content="[^"]*"' | cut -d'"' -f4)
if [[ "$og_url" == *"despejalax.es"* ]]; then
    echo -e "${GREEN}✓ OK${NC} → $og_url"
else
    echo -e "${RED}✗ FAIL${NC} → $og_url"
fi

# Verificar Canonical URL
echo -n "Canonical URL ... "
canonical=$(curl -s "https://www.despejalax.es" | grep -o 'rel="canonical" href="[^"]*"' | cut -d'"' -f4)
if [[ "$canonical" == *"despejalax.es"* ]]; then
    echo -e "${GREEN}✓ OK${NC} → $canonical"
else
    echo -e "${RED}✗ FAIL${NC} → $canonical"
fi

echo ""
echo "=========================================="
echo "✅ Verificación completada!"
echo ""
echo "💡 Notas:"
echo "- Si alguna prueba falla, espera 24-48h para propagación DNS"
echo "- Limpia la caché del navegador antes de probar manualmente"
echo "- Verifica que los dominios estén configurados en Vercel"
echo ""
