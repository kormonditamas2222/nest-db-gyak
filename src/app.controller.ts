import { Body, Controller, Get, Post, Query, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import { CreateJatekDto } from './CreateJatek.dto.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      title: 'Macskák adatbázis'
    }
  }

  @Get("macskak")
  @Render("macskak")
  async getMacskak() {
    return {
      macskak: await this.appService.getMacskak()
    };
  }

  @Get("jatekok")
  @Render("jatekok")
  async getJatekok() {
    return {
      jatekok: await this.appService.getJatekok()
    };
  }

  @Get("macskaKeres")
  @Render("kereses")
  async getMacskaBySzemSzin(@Query("szemszin") szemszin: string) {
    if (!szemszin) {
      return {
        macskak: await this.appService.getMacskak()
      };
    }
    return {
      macskak: await this.appService.getMacskaBySzemSzin(szemszin)
    };
  }

  @Get("ujJatek")
  @Render("jatekForm")
  getNewForm() {

  }

  @Post("ujJatek")
  async ujJatek(@Body() body: CreateJatekDto) {
    const jatek = await this.appService.ujJatek(body.nev);
    return "Sikeres beszúrás" + JSON.stringify(jatek);
  }
}
