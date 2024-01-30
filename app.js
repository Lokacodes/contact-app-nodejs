const yargs = require("yargs");
const contacts = require("./contacts");

//tapi ada sebuah module yang lebih bagus untuk mengatasi ini
//yaitu yargs

yargs
  .command({
    command: "add",
    describe: "menambahkan contact baru",
    builder: {
      nama: {
        describe: "nama lengkap",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "email kamu",
        demandOption: false,
        type: "string",
      },
      HP: {
        describe: "no HP kamu",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      const contact = {
        nama: argv.nama,
        email: argv.email,
        HP: argv.HP,
      };

      contacts.simpanData(contact);
    },
  })
  .demandCommand();

yargs.command({
  command: "list",
  describe: "menampilkan contact",
  handler() {
    contacts.listContact();
  },
});

yargs.command({
  command: "detail",
  describe: "menampilkan detail contact sesuai nama",
  builder: {
    nama: {
      describe: "nama yang dicari",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.detailContact(argv.nama);
    // console.log(argv.nama);
  },
});

yargs.command({
  command: "delete",
  describe: "menghapus contact sesuai nama",
  builder: {
    nama: {
      describe: "nama yang mau dihapus",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.deleteContact(argv.nama);
    // console.log(argv.nama);
  },
});

yargs.parse();

// mengambil argumen dari command line

//bisa mengambil argumen dari cmd line seperti ini
//misal : node app --loka --ismu
// lalu dicek dengan if

// if (process.argv[2] == 'loka'){
//   // some other code
// }

// else if (process.argv[3] == 'ismu'){
//   // come code
// }

// const contacts = require("./contacts");

// const main = async () => {
//   const nama = await contacts.pertanyaan("siapa nama kamuu? : ");
//   const email = await contacts.pertanyaan("mana email kamu? : ");
//   const HP = await contacts.pertanyaan("mana nomor kamu? : ");

//   contacts.simpanData(nama,email,HP);

// };

// main();
