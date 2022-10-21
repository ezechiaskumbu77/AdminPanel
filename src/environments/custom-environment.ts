import { HttpHeaders } from '@angular/common/http';

export const customEnvironment = {
  //BASE_URL: "https://admin.ppc-drc.com/api/v1",
  BASE_URL: "http://localhost:8080/api/v1",
  //BASE_URL: "http://localhost:4200/api",
  headers: new HttpHeaders()
};
