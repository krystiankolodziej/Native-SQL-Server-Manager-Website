import AppKit

// Kadrowanie zrzutu z jawnym offsetem — `sips` kadruje wyłącznie centralnie.
// Użycie: cropimg <wejście> <wyjście> <x> <y> <szerokość> <wysokość> [docelowa-szerokość]
let a = CommandLine.arguments
guard a.count >= 7,
      let src = CGImageSourceCreateWithURL(URL(fileURLWithPath: a[1]) as CFURL, nil),
      let image = CGImageSourceCreateImageAtIndex(src, 0, nil) else {
    FileHandle.standardError.write(Data("nie udało się wczytać obrazu\n".utf8))
    exit(1)
}

let rect = CGRect(x: Int(a[3])!, y: Int(a[4])!, width: Int(a[5])!, height: Int(a[6])!)
guard let cropped = image.cropping(to: rect) else {
    FileHandle.standardError.write(Data("kadr poza obrazem\n".utf8))
    exit(1)
}

var result = cropped
if a.count > 7, let targetWidth = Int(a[7]), targetWidth != cropped.width {
    let scale = Double(targetWidth) / Double(cropped.width)
    let targetHeight = Int((Double(cropped.height) * scale).rounded())
    let space = cropped.colorSpace ?? CGColorSpaceCreateDeviceRGB()
    guard let ctx = CGContext(data: nil, width: targetWidth, height: targetHeight,
                              bitsPerComponent: 8, bytesPerRow: 0, space: space,
                              bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue) else { exit(1) }
    ctx.interpolationQuality = .high
    ctx.draw(cropped, in: CGRect(x: 0, y: 0, width: targetWidth, height: targetHeight))
    guard let scaled = ctx.makeImage() else { exit(1) }
    result = scaled
}

guard let dest = CGImageDestinationCreateWithURL(URL(fileURLWithPath: a[2]) as CFURL,
                                                 "public.png" as CFString, 1, nil) else { exit(1) }
CGImageDestinationAddImage(dest, result, nil)
guard CGImageDestinationFinalize(dest) else { exit(1) }
print("\(result.width)x\(result.height)")
