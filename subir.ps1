Add-Type -AssemblyName System.Windows.Forms

$base = "C:\Users\Njpf\el-remanso\images"

function ElegirFotos($titulo, $prefijo) {
    $dialog = New-Object System.Windows.Forms.OpenFileDialog
    $dialog.Title = $titulo
    $dialog.Filter = "Imagenes|*.jpg;*.jpeg;*.png;*.webp"
    $dialog.Multiselect = $true
    $dialog.InitialDirectory = [Environment]::GetFolderPath("UserProfile")
    
    if ($dialog.ShowDialog() -eq "OK") {
        $i = 1
        foreach ($file in $dialog.FileNames) {
            $dest = "$base\$prefijo-$i.jpg"
            Copy-Item $file $dest -Force
            Write-Host "OK: $dest" -ForegroundColor Green
            $i++
        }
    } else {
        Write-Host "OMITIDO: $titulo" -ForegroundColor Yellow
    }
}

function ElegirUna($titulo, $nombre) {
    $dialog = New-Object System.Windows.Forms.OpenFileDialog
    $dialog.Title = $titulo
    $dialog.Filter = "Imagenes|*.jpg;*.jpeg;*.png;*.webp"
    $dialog.InitialDirectory = [Environment]::GetFolderPath("UserProfile")
    
    if ($dialog.ShowDialog() -eq "OK") {
        Copy-Item $dialog.FileName "$base\$nombre" -Force
        Write-Host "OK: $nombre" -ForegroundColor Green
    } else {
        Write-Host "OMITIDO: $titulo" -ForegroundColor Yellow
    }
}

Write-Host "================================" -ForegroundColor Cyan
Write-Host "  EL REMANSO - SUBIR FOTOS" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host "Puedes elegir VARIAS fotos a la vez" -ForegroundColor White
Write-Host "Presiona CANCELAR para saltar una seccion" -ForegroundColor White
Write-Host ""

ElegirUna  "PORTADA - Foto principal del sitio" "portada.jpg"
ElegirFotos "TRIPLE 1 - Elige todas las fotos (varias a la vez)" "triple1"
ElegirFotos "TRIPLE 2 - Elige todas las fotos (varias a la vez)" "triple2"
ElegirFotos "DOBLE 1 - Elige todas las fotos (varias a la vez)" "doble1"
ElegirFotos "DOBLE 2 - Elige todas las fotos (varias a la vez)" "doble2"
ElegirFotos "DOBLE 3 - Elige todas las fotos (varias a la vez)" "doble3"
ElegirFotos "MATRIMONIAL 1 - Elige todas las fotos" "matri1"
ElegirFotos "MATRIMONIAL 2 - Elige todas las fotos" "matri2"
ElegirFotos "MATRIMONIAL 3 - Elige todas las fotos" "matri3"
ElegirFotos "MATRIMONIAL 4 - Elige todas las fotos" "matri4"
ElegirFotos "MATRIMONIAL 5 - Elige todas las fotos" "matri5"
ElegirUna  "PISCINA - Foto de la piscina" "piscina.jpg"
ElegirUna  "PLAYA - Foto de la playa" "playa.jpg"
ElegirUna  "SALA - Foto del area social" "sala.jpg"
ElegirUna  "COCINA - Foto de la cocina" "cocina.jpg"

Write-Host ""
Write-Host "Subiendo al sitio web..." -ForegroundColor Cyan
cd "C:\Users\Njpf\el-remanso"
git add .
git commit -m "actualizar fotos"
git push

Write-Host ""
Write-Host "LISTO - Aparece en 2 minutos" -ForegroundColor Green
Write-Host "elremanso-tonsupa.netlify.app" -ForegroundColor Cyan
pause