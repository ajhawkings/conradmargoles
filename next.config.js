/** @type {import('next').NextConfig} */

module.exports = {
  output: 'export',
  reactStrictMode: true,
  images: {
    loader: "custom",
    imageSizes: [16, 64, 256, 384],
    deviceSizes: [640, 1080, 1920, 3840],
  },
  transpilePackages: ["next-image-export-optimizer"],
  env: {
    nextImageExportOptimizer_imageFolderPath: "public/images",
    nextImageExportOptimizer_exportFolderPath: "out",
    nextImageExportOptimizer_quality: 75,
    nextImageExportOptimizer_storePicturesInWEBP: true,
    nextImageExportOptimizer_exportFolderName: "nextImageExportOptimizer",
    nextImageExportOptimizer_generateAndUseBlurImages: true,
  },
}
