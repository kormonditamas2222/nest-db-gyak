import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service.js';

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
}
