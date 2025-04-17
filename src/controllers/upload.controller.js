class MulterController {
  async uploadImage(req, res) {
      try {
          const file = req.file;
          if (!file) {
              return res.status(400).json({
                  message: "No se ha proporcionado ningún archivo!",
              });
          }
          return res.status(200).json({
              message: "Archivo cargado con éxito!",
              file: {
                  url: file.path,
                  public_id: file.filename,
              },
          });
      } catch (error) {
          return res.status(500).json({ error: error.message });
      }
  }
}

module.exports = MulterController;
