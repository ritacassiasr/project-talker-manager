const fs = require('fs/promises');
const crypto = require('crypto');

const readFile = async (path) => {
    try {
        const data = await fs.readFile(path, 'utf8');
        const result = JSON.parse(data);
        return result;
    } catch (err) {
        console.log(`Erro na leitura do arquivo ${err.message}`);
        return false;
    }
};

const generateToken = () => crypto.randomBytes(8).toString('hex');

const writeData = async (data, path) => {
    try {
      console.log(data);
      await fs.writeFile(path, JSON.stringify(data));
      return true;
    } catch (err) {
      console.error(`erro ao salvar arquivo: ${err.message}`);
      return false;
    }
  };

module.exports = {
    readFile,
    generateToken,
    writeData,
};