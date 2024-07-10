export class DosenLoginRequest {
  nidn: string;
  password: string;
}

export class DosenLoginResponse {
  nidn: string;
  token: string;
}

export class DosenProfile {
  nidn: string;
  nama: string;
  programStudi: string;
  jenjangPendidikan: string;
  jenisKelamin: string;
  tanggalLahir: Date;
  jabatanAkademik: string;
  noTelephone: string;
  alamatSurel: string;
}
