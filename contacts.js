const fs = require("node:fs");
const chalk = require("chalk");
const validator = require("validator");

const dirPath = "./data";
const filePath = "data/contacts.json";

const cekFilePath = (filePath) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]");
  }
};

const cekDirPath = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
};

const ambil = (path) => {
  const file = fs.readFileSync(path, "utf8"); //membaca isi file dan dirubah jadi string (json => string)
  const contactsBaca = JSON.parse(file); //string => json supaya bisa di push
  return contactsBaca;
};

const simpanData = (contactDataArgs) => {
  cekDirPath(dirPath);
  cekFilePath(filePath);

  const contactsBaca = ambil(filePath);

  const duplikat = contactsBaca.find(
    (contactSatuSatu) => contactSatuSatu.nama === contactDataArgs.nama
  );
  // tolong carikan dari contactsBaca(dari hasil pembacaan) sebagai contactSatuSatu(per item dalam hasil bacaan) apakah ada yang sama dengan contactDataArgs(inputan) h3h3

  if (duplikat) {
    console.log(
      chalk.red.inverse.bold("  nama tersebut sudah terdaftar. coba lagi!  ")
    );
    return false;
  }

  if (contactDataArgs.email) {
    if (!validator.isEmail(contactDataArgs.email)) {
      console.log(chalk.red("  email tidak valid! coba lagi!  "));
      return false;
    }
  }

  if (!validator.isMobilePhone(contactDataArgs.HP, "id-ID")) {
    console.log(chalk.red("  nomor tidak valid! coba lagi!  "));
    return false;
  }

  contactsBaca.push(contactDataArgs); //push data baru (menambahkan di paling belakang)
  fs.writeFileSync("data/contacts.json", JSON.stringify(contactsBaca));
  console.log(chalk.green.inverse("  makasih  "));
};

const listContact = () => {
  const contacts = ambil(filePath);
  console.log(chalk.yellow.inverse.bold("  My Contacts  "));
  contacts.forEach((e, i) => {
    console.table(`${i + 1}. ${e.nama} - ${e.HP}`);
  });
};

const detailContact = (nama) => {
  const contacts = ambil(filePath);
  const detail = contacts.find((c) => c.nama === nama);

  if (!detail) {
    console.log(`${nama} ga ada coi`);
    return false;
  }

  console.log(`nama  : ${detail.nama}`);
  console.log(`HP    : ${detail.HP}`);
  console.log(`email : ${detail.email}`);
};

const deleteContact = (nama) => {
  const contacts = ambil(filePath);
  const kecuali = contacts.filter((kec) => kec.nama != nama);

  if(contacts.length === kecuali.length){
    console.log("ga ada coi")
    return false;
  }

  fs.writeFileSync(filePath, JSON.stringify(kecuali));
  console.log(chalk.yellow.inverse(`  ${nama} berhasil di hapus ok bye  `))
};

module.exports = {
  simpanData,
  listContact,
  detailContact,
  deleteContact
};
