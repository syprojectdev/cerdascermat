// ============================================================
// DATABASE SOAL - CERDAS CERMAT ISLAMI
// Edit soal di sini dengan mudah!
// Format: { question, choices, answer (index 0-based), explanation }
// ============================================================

const questions = [
  // === I. AL-QUR'AN & HADIS ===
  {
    question: "Surah yang dikenal sebagai 'Jantung Al-Qur'an' adalah...",
    choices: ["Al-Baqarah", "Yasin", "Al-Ikhlas", "Al-Fatihah"],
    answer: 1,
    explanation: "Surah Yasin disebut jantungnya Al-Qur'an berdasarkan hadis riwayat Tirmidzi karena kandungannya mencakup pokok-pokok iman."
  },
  {
    question: "Hukum bacaan apabila Nun Sukun bertemu dengan huruf 'Ba' disebut...",
    choices: ["Idgham Bigunnah", "Izhar Halqi", "Iqlab", "Ikhfa Hakiki"],
    answer: 2,
    explanation: "Iqlab terjadi jika nun sukun/tanwin bertemu huruf Ba, bunyinya berubah menjadi suara Mim disertai dengung."
  },
  {
    question: "Potongan ayat 'Lakum dinukum waliyadin' terdapat dalam surah...",
    choices: ["Al-Kafirun", "Al-Ma'un", "Al-Lahab", "Al-Fil"],
    answer: 0,
    explanation: "Ayat ini merupakan penegasan toleransi beragama yang berarti 'Untukmu agamamu, dan untukku agamaku.'"
  },
  {
    question: "Hadis yang sanadnya bersambung sampai kepada Nabi Muhammad SAW disebut hadis...",
    choices: ["Dhaif", "Maudhu'", "Marfu'", "Mursal"],
    answer: 2,
    explanation: "Hadis Marfu' adalah hadis yang secara khusus disandarkan kepada Nabi Muhammad SAW, baik berupa perkataan, perbuatan, maupun ketetapan."
  },
  {
    question: "Wahyu pertama yang diterima Nabi Muhammad SAW adalah Surah Al-Alaq ayat...",
    choices: ["1-10", "1-7", "1-3", "1-5"],
    answer: 3,
    explanation: "Lima ayat pertama Surah Al-Alaq diturunkan di Gua Hira sebagai tanda dimulainya kenabian Muhammad SAW."
  },
  {
    question: "Arti dari kata 'Al-Falaq' adalah...",
    choices: ["Waktu Subuh", "Pertolongan", "Pembukaan", "Kemuliaan"],
    answer: 0,
    explanation: "Al-Falaq berarti waktu subuh atau fajar, berisi permohonan perlindungan kepada Allah dari kejahatan makhluk di waktu gelap."
  },
  // === II. AKIDAH ===
  {
    question: "Sifat wajib bagi Allah yang berarti 'Terdahulu' atau tidak ada permulaannya adalah...",
    choices: ["Baqa'", "Qidam", "Wujud", "Mukhalafatu lil hawaditsi"],
    answer: 1,
    explanation: "Qidam berarti terdahulu. Allah ada sebelum segala sesuatu ada dan tidak memiliki titik awal."
  },
  {
    question: "Malaikat yang bertugas membagi rezeki dan mengatur hujan adalah...",
    choices: ["Jibril", "Mikail", "Israfil", "Izrail"],
    answer: 1,
    explanation: "Malaikat Mikail memiliki tugas khusus mengatur fenomena alam (hujan/angin) dan mendistribusikan rezeki kepada seluruh makhluk."
  },
  {
    question: "Kitab Injil diturunkan kepada Nabi...",
    choices: ["Musa AS", "Daud AS", "Isa AS", "Ibrahim AS"],
    answer: 2,
    explanation: "Kitab Injil diberikan kepada Nabi Isa AS sebagai petunjuk bagi kaum Bani Israil pada masanya."
  },
  {
    question: "Percaya kepada hari akhir merupakan rukun iman yang ke...",
    choices: ["3", "4", "5", "6"],
    answer: 2,
    explanation: "Urutan rukun iman: 1) Allah, 2) Malaikat, 3) Kitab, 4) Rasul, 5) Hari Kiamat, 6) Qada & Qadar."
  },
  {
    question: "Sifat 'Siddiq' bagi para Rasul memiliki arti...",
    choices: ["Benar/Jujur", "Dapat dipercaya", "Cerdas", "Menyampaikan"],
    answer: 0,
    explanation: "Siddiq berarti benar. Mustahil bagi seorang Rasul untuk berbohong dalam menyampaikan risalah Allah."
  },
  {
    question: "Ketentuan Allah SWT terhadap makhluk-Nya sejak zaman azali disebut...",
    choices: ["Qada", "Qadar", "Tawakal", "Ikhtiar"],
    answer: 0,
    explanation: "Qada adalah ketetapan Allah yang telah tertulis di Lauhul Mahfuz sejak zaman azali (sebelum dunia diciptakan)."
  },
  // === III. AKHLAK ===
  {
    question: "Sikap rendah hati dan tidak sombong disebut dengan istilah...",
    choices: ["Tawadhu'", "Takabur", "Qana'ah", "Istiqamah"],
    answer: 0,
    explanation: "Tawadhu' adalah sikap rendah hati, menyadari bahwa semua kelebihan hanyalah titipan Allah, dan tidak merendahkan orang lain."
  },
  {
    question: "Berlebih-lebihan dalam menggunakan sesuatu melampaui batas disebut...",
    choices: ["Tabzir", "Israf", "Riya", "Hasad"],
    answer: 1,
    explanation: "Israf adalah pemborosan dalam hal yang mubah (boleh), sedangkan Tabzir lebih pada penggunaan harta untuk hal yang maksiat."
  },
  {
    question: "Sikap selalu merasa cukup atas pemberian Allah SWT disebut...",
    choices: ["Syukur", "Sabar", "Qana'ah", "Ikhlas"],
    answer: 2,
    explanation: "Qana'ah adalah merasa cukup dan rela atas hasil yang telah diusahakan, sehingga terhindar dari sifat serakah."
  },
  {
    question: "Menceritakan keburukan orang lain dengan tujuan menjatuhkan martabatnya disebut...",
    choices: ["Namimah", "Ghibah", "Fitnah", "Su'udzon"],
    answer: 1,
    explanation: "Ghibah adalah membicarakan keburukan orang lain (fakta yang benar tapi tidak disukai orang tersebut) saat ia tidak ada."
  },
  {
    question: "Induk dari segala perbuatan maksiat atau dosa besar adalah...",
    choices: ["Syirik", "Malas", "Boros", "Dendam"],
    answer: 0,
    explanation: "Menyekutukan Allah adalah dosa paling besar (Zulmun 'Adzim) yang tidak akan diampuni jika dibawa mati tanpa tobat."
  },
  {
    question: "Sikap teguh pendirian dalam kebenaran disebut...",
    choices: ["Amanah", "Fathonah", "Istiqamah", "Tabligh"],
    answer: 2,
    explanation: "Istiqamah adalah sikap konsisten dan teguh hati dalam menjalankan ketaatan meskipun banyak rintangan."
  },
  // === IV. FIKIH ===
  {
    question: "Thaharah secara bahasa berarti...",
    choices: ["Ibadah", "Bersuci", "Mandi", "Wudhu"],
    answer: 1,
    explanation: "Thaharah secara bahasa berarti bersih atau suci dari kotoran (najis) dan keadaan tidak suci (hadas)."
  },
  {
    question: "Air yang suci namun tidak dapat menyucikan seperti air teh atau air kopi disebut...",
    choices: ["Air Mutlak", "Air Musta'mal", "Air Mutanajis", "Air Musyammas"],
    answer: 1,
    explanation: "Air Musta'mal adalah air yang suci (boleh diminum) tetapi sudah pernah digunakan untuk bersuci sehingga tidak bisa digunakan untuk wudhu lagi."
  },
  {
    question: "Syarat sah salat di bawah ini adalah, KECUALI...",
    choices: ["Menghadap kiblat", "Suci dari hadas", "Menutup aurat", "Membaca surah pendek"],
    answer: 3,
    explanation: "Membaca surah setelah Al-Fatihah hukumnya sunnah, bukan syarat sah salat."
  },
  {
    question: "Puasa yang dilakukan pada tanggal 10 Muharram disebut puasa...",
    choices: ["Arafah", "Asyura", "Syawal", "Daud"],
    answer: 1,
    explanation: "Puasa Asyura dilaksanakan pada 10 Muharram untuk memperingati hari Allah menyelamatkan Nabi Musa dari Firaun."
  },
  {
    question: "Batas minimal jumlah harta sehingga wajib dikeluarkan zakatnya disebut...",
    choices: ["Haul", "Muzakki", "Nisab", "Mustahik"],
    answer: 2,
    explanation: "Nisab adalah batas jumlah harta tertentu (misal: setara 85 gram emas) yang menjadi syarat seseorang wajib mengeluarkan zakat mal."
  },
  {
    question: "Lari-lari kecil antara bukit Safa dan Marwah dalam ibadah haji disebut...",
    choices: ["Tawaf", "Sa'i", "Wukuf", "Tahallul"],
    answer: 1,
    explanation: "Sa'i adalah ibadah berlari-lari kecil antara Shafa dan Marwah sebanyak 7 kali, mengenang perjuangan Siti Hajar mencari air untuk Ismail AS."
  },
  // === V. SEJARAH KEBUDAYAAN ISLAM ===
  {
    question: "Nama ayah dari Nabi Muhammad SAW adalah...",
    choices: ["Abu Talib", "Abdul Muthalib", "Abdullah", "Abbas"],
    answer: 2,
    explanation: "Abdullah bin Abdul Muthalib adalah ayah Nabi Muhammad SAW, wafat saat Nabi masih berada dalam kandungan."
  },
  {
    question: "Peristiwa hijrahnya Nabi Muhammad SAW dari Mekkah ke Madinah menjadi dasar penetapan...",
    choices: ["Kalender Masehi", "Kalender Hijriah", "Zakat Fitrah", "Shalat lima waktu"],
    answer: 1,
    explanation: "Khalifah Umar bin Khattab menetapkan tahun hijrahnya Nabi sebagai tahun pertama penanggalan Islam (Kalender Hijriah)."
  },
  {
    question: "Khalifah pertama dari Khulafaur Rasyidin adalah...",
    choices: ["Umar bin Khattab", "Ali bin Abi Thalib", "Utsman bin Affan", "Abu Bakar As-Siddiq"],
    answer: 3,
    explanation: "Abu Bakar As-Siddiq dipilih melalui musyawarah setelah wafatnya Rasulullah untuk memimpin umat Islam."
  },
  {
    question: "Gelar 'Al-Faruq' yang berarti pembeda antara haq dan bathil diberikan kepada...",
    choices: ["Umar bin Khattab", "Hamzah bin Abdul Muthalib", "Khalid bin Walid", "Ali bin Abi Thalib"],
    answer: 0,
    explanation: "Gelar Al-Faruq diberikan kepada Umar bin Khattab karena keberanian dan ketegasannya dalam membedakan kebenaran dan kebatilan."
  },
  {
    question: "Masjid pertama yang dibangun oleh Nabi Muhammad SAW saat perjalanan hijrah adalah...",
    choices: ["Masjid Nabawi", "Masjidil Haram", "Masjid Quba", "Masjid Al-Aqsa"],
    answer: 2,
    explanation: "Masjid Quba dibangun oleh Rasulullah dalam perjalanan menuju Madinah sebelum sampai ke pusat kota."
  },
  {
    question: "Kota Madinah sebelum kedatangan Islam bernama...",
    choices: ["Thaif", "Yatsrib", "Habasyah", "Syam"],
    answer: 1,
    explanation: "Setelah Nabi Muhammad SAW hijrah ke sana, nama Yatsrib diubah menjadi Madinatun Nabawi (Kota Nabi) atau Madinah."
  },
  // === VI. AL-QUR'AN & HADIS LANJUTAN ===
  {
    question: "Surah Al-Ma'un menceritakan ciri orang yang mendustakan agama, salah satunya adalah...",
    choices: ["Orang yang suka pamer (riya)", "Orang yang berbuat zina", "Orang yang suka mencuri", "Orang yang membunuh tanpa hak"],
    answer: 0,
    explanation: "Al-Ma'un menyebut pendusta agama adalah mereka yang menghardik anak yatim dan shalatnya riya (pamer)."
  },
  {
    question: "Hukum bacaan ketika huruf Mad bertemu hamzah dalam satu kata disebut...",
    choices: ["Mad Jaiz Munfasil", "Mad Wajib Muttasil", "Mad Arid Lissukun", "Mad Iwad"],
    answer: 1,
    explanation: "Mad Wajib Muttasil: Muttasil berarti bersambung dalam satu kata (Mad + Hamzah bersambung)."
  },
  {
    question: "Hadis yang diriwayatkan oleh Imam Bukhari dan Imam Muslim secara bersamaan disebut hadis...",
    choices: ["Hasan", "Mutawatir", "Muttafaqun 'Alaih", "Shahih Lighairihi"],
    answer: 2,
    explanation: "Muttafaqun 'Alaih adalah istilah khusus untuk hadis yang disepakati keshahihannya oleh Imam Bukhari dan Imam Muslim."
  },
  {
    question: "Al-Qur'an berfungsi sebagai 'Al-Furqan', yang artinya...",
    choices: ["Penawar/Obat", "Pemberi petunjuk", "Pembeda antara benar dan salah", "Cahaya penerang"],
    answer: 2,
    explanation: "Al-Furqan berarti pemisah antara yang hak (benar) dan batil (salah)."
  },
  {
    question: "Tujuan utama diturunkannya Surah Al-Ikhlas adalah untuk menegaskan...",
    choices: ["Tata cara ibadah", "Kemurnian tauhid (keesaan Allah)", "Sejarah Nabi terdahulu", "Hukum waris"],
    answer: 1,
    explanation: "Surah Al-Ikhlas memurnikan keesaan Allah dari segala bentuk kesyirikan."
  },
  {
    question: "Surah dalam Al-Qur'an yang tidak diawali dengan bacaan Basmalah adalah...",
    choices: ["Surah At-Taubah", "Surah An-Naml", "Surah Al-Kahfi", "Surah Al-Fath"],
    answer: 0,
    explanation: "Surah At-Taubah (Bara'ah) diawali dengan pernyataan perang/pemutusan hubungan dengan kaum musyrik sehingga tidak diawali basmalah."
  },
  {
    question: "Wahyu terakhir yang diturunkan kepada Nabi Muhammad SAW adalah surah...",
    choices: ["Al-Alaq ayat 1-5", "Al-Maidah ayat 3", "An-Nashr ayat 1-3", "Al-Baqarah ayat 282"],
    answer: 1,
    explanation: "Al-Maidah ayat 3 berisi pernyataan bahwa agama Islam telah sempurna, diturunkan saat Haji Wada'."
  },
  {
    question: "Berapa jumlah surah dalam Al-Qur'an?",
    choices: ["110", "112", "114", "116"],
    answer: 2,
    explanation: "Standar mushaf Utsmani terdiri dari 114 surah."
  },
  // === VII. AKIDAH LANJUTAN ===
  {
    question: "Sifat mustahil bagi Allah 'Ajzun' memiliki arti...",
    choices: ["Bodoh", "Terpaksa", "Lemah", "Mati"],
    answer: 2,
    explanation: "Allah Maha Kuasa (Qudrat), maka mustahil Allah bersifat lemah ('Ajzun)."
  },
  {
    question: "Nabi yang diberikan mukjizat bisa berbicara dengan hewan dan memimpin jin adalah...",
    choices: ["Nabi Sulaiman AS", "Nabi Daud AS", "Nabi Yusuf AS", "Nabi Nuh AS"],
    answer: 0,
    explanation: "Mukjizat Nabi Sulaiman termasuk memahami bahasa semut dan burung serta menundukkan jin."
  },
  {
    question: "Kepercayaan bahwa Allah SWT memiliki anak atau sekutu termasuk dalam perbuatan...",
    choices: ["Fasik", "Syirik", "Nifaq", "Bid'ah"],
    answer: 1,
    explanation: "Syirik adalah dosa menyekutukan Allah dengan sesuatu yang lain."
  },
  {
    question: "Malaikat yang bertugas menanyakan amal manusia di dalam kubur adalah...",
    choices: ["Rakib dan Atid", "Malik dan Ridwan", "Munkar dan Nakir", "Jibril dan Mikail"],
    answer: 2,
    explanation: "Munkar dan Nakir bertugas di alam barzakh (kubur) untuk menanyakan tentang amal manusia."
  },
  {
    question: "Sifat 'Tabligh' bagi para Rasul artinya...",
    choices: ["Benar", "Menyampaikan wahyu", "Cerdas", "Terpercaya"],
    answer: 1,
    explanation: "Rasul wajib menyampaikan (Tabligh) setiap wahyu yang diterima tanpa ada yang disembunyikan."
  },
  {
    question: "Beriman kepada takdir yang baik maupun buruk merupakan rukun iman yang ke...",
    choices: ["3", "4", "5", "6"],
    answer: 3,
    explanation: "Percaya pada takdir (Qada dan Qadar) adalah rukun iman yang keenam (terakhir)."
  },
  {
    question: "Sifat wajib bagi Rasul 'Fathonah' berarti...",
    choices: ["Cerdas/Bijaksana", "Berani", "Sabar", "Santun"],
    answer: 0,
    explanation: "Fathonah (cerdas/bijaksana) diperlukan Rasul untuk berhujjah (berargumen) dan memimpin umat."
  },
  {
    question: "Nama lain hari kiamat sebagai 'Hari Pembalasan' adalah...",
    choices: ["Yaumul Ba'ats", "Yaumul Hisab", "Yaumul Jaza'", "Yaumul Mizan"],
    answer: 2,
    explanation: "Yaumul Jaza' berarti hari di mana setiap amal dibalas setimpal."
  },
  // === VIII. AKHLAK LANJUTAN ===
  {
    question: "Sifat jujur dalam perkataan dan perbuatan disebut...",
    choices: ["Amanah", "Shiddiq", "Tabligh", "Fathonah"],
    answer: 1,
    explanation: "Shiddiq berarti integritas antara hati, lisan, dan perbuatan."
  },
  {
    question: "Berpura-pura beriman padahal hatinya ingkar disebut...",
    choices: ["Syirik", "Nifaq (Munafik)", "Takabur", "Ujub"],
    answer: 1,
    explanation: "Nifaq adalah penyakit hati di mana lahiriahnya Islam tapi batinnya kafir."
  },
  {
    question: "Mengharap hilangnya nikmat orang lain dan merasa senang jika orang lain susah disebut...",
    choices: ["Riya", "Hasad (Dengki)", "Sum'ah", "Namimah"],
    answer: 1,
    explanation: "Hasad adalah penyakit hati yang sangat berbahaya karena dapat memakan amal kebaikan."
  },
  {
    question: "Berbuat baik kepada orang tua disebut dengan istilah...",
    choices: ["Ukhuwah Islamiyah", "Birrul Walidain", "Silaturahmi", "Hubbul Wathan"],
    answer: 1,
    explanation: "Birrul Walidain (berbakti kepada orang tua) adalah kewajiban nomor dua setelah tauhid."
  },
  {
    question: "Sikap menunda-nunda tobat dan merasa aman dari azab Allah disebut...",
    choices: ["Khauf", "Raja'", "Taswif", "Ghibah"],
    answer: 2,
    explanation: "Taswif berarti berkata 'nanti saja' (prokrastinasi) dalam urusan tobat."
  },
  {
    question: "Melakukan amal ibadah agar didengar dan dipuji oleh orang lain disebut...",
    choices: ["Riya", "Sum'ah", "Ujub", "Takabur"],
    answer: 1,
    explanation: "Sum'ah berasal dari kata 'Sama'a' (mendengar), beramal agar didengar orang lain."
  },
  {
    question: "Sifat 'Amanah' secara bahasa berarti...",
    choices: ["Menghormati", "Dapat dipercaya", "Menyayangi", "Berbagi"],
    answer: 1,
    explanation: "Amanah berarti menjaga apa yang dititipkan atau dipercayakan."
  },
  {
    question: "Sikap pantang menyerah dan teguh dalam menghadapi cobaan disebut...",
    choices: ["Sabar", "Ikhlas", "Syukur", "Tawakal"],
    answer: 0,
    explanation: "Sabar adalah menahan diri dari keluh kesah dalam ketaatan, musibah, dan menjauhi maksiat."
  },
  // === IX. FIKIH LANJUTAN ===
  {
    question: "Salat sunnah yang dikerjakan untuk meminta hujan disebut...",
    choices: ["Salat Khusuf", "Salat Istisqa", "Salat Istikharah", "Salat Tahajud"],
    answer: 1,
    explanation: "Salat Istisqa secara bahasa berarti meminta minum/hujan kepada Allah SWT."
  },
  {
    question: "Zakat yang wajib dikeluarkan setiap jiwa Muslim pada bulan Ramadhan disebut...",
    choices: ["Zakat Mal", "Zakat Fitrah", "Zakat Perniagaan", "Zakat Pertanian"],
    answer: 1,
    explanation: "Zakat Fitrah bertujuan menyucikan diri bagi yang berpuasa Ramadhan."
  },
  {
    question: "Rukun haji yang berupa berdiam diri di Padang Arafah disebut...",
    choices: ["Ihram", "Tawaf", "Wukuf", "Sa'i"],
    answer: 2,
    explanation: "Wukuf adalah inti ibadah haji (Al-Hajju Arafah), berdiam di Padang Arafah."
  },
  {
    question: "Hukum asal melakukan pernikahan dalam Islam adalah...",
    choices: ["Wajib", "Sunnah", "Mubah", "Makruh"],
    answer: 1,
    explanation: "Secara umum hukumnya sunnah (mengikuti sunnah Rasul), namun bisa berubah sesuai kondisi individu."
  },
  {
    question: "Najis yang berasal dari air kencing bayi laki-laki yang hanya minum ASI disebut najis...",
    choices: ["Mukhaffafah", "Mutawassitah", "Mugallazah", "Ma'fu"],
    answer: 0,
    explanation: "Najis Mukhaffafah (ringan), cukup dipercikkan air pada bagian yang terkena untuk menyucikannya."
  },
  {
    question: "Mengusap sepatu atau khuff sebagai pengganti mencuci kaki saat wudhu hukumnya...",
    choices: ["Wajib", "Boleh (Rukhsah)", "Haram", "Makruh"],
    answer: 1,
    explanation: "Ini adalah kemudahan (rukhsah) bagi musafir atau kondisi dingin sesuai syarat tertentu."
  },
  {
    question: "Salat sunnah dua rakaat yang dilakukan saat masuk masjid disebut salat...",
    choices: ["Rawatib", "Tahiyatul Masjid", "Dhuha", "Witir"],
    answer: 1,
    explanation: "Salat Tahiyatul Masjid adalah bentuk penghormatan saat memasuki rumah Allah (masjid)."
  },
  {
    question: "Waktu pelaksanaan salat Idul Fitri adalah pada tanggal...",
    choices: ["1 Syawal", "10 Zulhijjah", "1 Ramadhan", "12 Rabiul Awal"],
    answer: 0,
    explanation: "Idul Fitri dirayakan pada 1 Syawal setelah selesainya bulan Ramadhan."
  },
  // === X. SEJARAH KEBUDAYAAN ISLAM LANJUTAN ===
  {
    question: "Siapakah paman Nabi Muhammad SAW yang sangat memusuhi dakwah Islam?",
    choices: ["Abu Talib", "Abu Lahab", "Hamzah", "Abbas"],
    answer: 1,
    explanation: "Abu Lahab adalah paman kandung yang dikutuk Allah dalam Surah Al-Lahab karena kekejamannya pada dakwah Nabi."
  },
  {
    question: "Perjanjian damai antara kaum Muslimin dan kaum Quraisy disebut Perjanjian...",
    choices: ["Aqabah", "Hudaibiyah", "Piagam Madinah", "Baiat Ridhwan"],
    answer: 1,
    explanation: "Perjanjian Hudaibiyah terjadi pada tahun 6 Hijriah, yang awalnya dianggap merugikan Muslim tapi justru menjadi kemenangan besar."
  },
  {
    question: "Ibu susuan pertama Nabi Muhammad SAW setelah ibunya adalah...",
    choices: ["Halimah As-Sa'diyah", "Ummu Aiman", "Tsuwaibah Al-Aslamiyah", "Fatimah binti Asad"],
    answer: 2,
    explanation: "Tsuwaibah Al-Aslamiyah adalah budak Abu Lahab yang pertama kali menyusui Nabi sebelum Halimah."
  },
  {
    question: "Perang di mana kaum Muslimin menggunakan strategi parit (Khandaq) adalah...",
    choices: ["Perang Badar", "Perang Uhud", "Perang Ahzab", "Perang Hunain"],
    answer: 2,
    explanation: "Perang Ahzab (Golongan yang bersekutu): Muslim membuat parit atas usul Salman Al-Farisi untuk melindungi Madinah."
  },
  {
    question: "Khalifah yang dijuluki 'Dzun Nurain' (Pemilik Dua Cahaya) adalah...",
    choices: ["Abu Bakar", "Umar bin Khattab", "Utsman bin Affan", "Ali bin Abi Thalib"],
    answer: 2,
    explanation: "Utsman bin Affan dijuluki Dzun Nurain karena menikahi dua putri Rasulullah secara berurutan (Ruqayyah dan Ummu Kultsum)."
  },
  {
    question: "Berapa lama Nabi Muhammad SAW berdakwah di kota Mekkah?",
    choices: ["10 tahun", "13 tahun", "23 tahun", "5 tahun"],
    answer: 1,
    explanation: "Fase Mekkah berlangsung selama 13 tahun sebelum Nabi akhirnya hijrah ke Madinah."
  },
  {
    question: "Perjalanan Nabi Muhammad SAW dari Masjidil Haram ke Masjidil Aqsa lalu ke Sidratul Muntaha disebut...",
    choices: ["Hijrah", "Isra' Mi'raj", "Fathul Makkah", "Nuzulul Qur'an"],
    answer: 1,
    explanation: "Isra' (perjalanan bumi dari Masjidil Haram ke Masjidil Aqsa) dan Mi'raj (perjalanan ke langit) terjadi dalam satu malam."
  },
  {
    question: "Sahabat Nabi yang menyusun mushaf Al-Qur'an pertama kali pada masa Khalifah Abu Bakar adalah...",
    choices: ["Zaid bin Tsabit", "Abdullah bin Mas'ud", "Ubay bin Ka'ab", "Ali bin Abi Thalib"],
    answer: 0,
    explanation: "Zaid bin Tsabit adalah sekretaris wahyu yang dipercaya memimpin kodifikasi Al-Qur'an karena kecerdasannya."
  }
];
