import { Injectable } from '@nestjs/common';
import mysql from 'mysql2/promise';
import { Macska } from './Macska.js';
import { Jatek } from './Jatek.js';

const mysqlConnection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "macska_db"
})

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getMacskak() {
    const [results] = await mysqlConnection.execute("SELECT id, suly, szem_szin, gazdi_id, jatek_id FROM macskak");
    return results as Macska[];
  }

  async getJatekok() {
    const [results] = await mysqlConnection.execute("SELECT id, nev FROM jatekok");
    return results as Jatek[];
  }

  async getMacskaBySzemSzin(szemszin: string) {
    const [results] = await mysqlConnection.execute("SELECT id, suly, szem_szin, gazdi_id, jatek_id FROM macskak WHERE szem_szin = ?", [szemszin]);
    return results as Macska[];
  }

  async ujJatek(nev: string) {
    const [results] = await mysqlConnection.execute("INSERT INTO jatekok (nev) VALUES (?)", [nev])
    const rows = results as any;
    return {
      id: rows.insertId,
      nev
    } as Jatek;
  }
}
