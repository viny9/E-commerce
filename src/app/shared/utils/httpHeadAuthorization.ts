import { HttpHeaders } from '@angular/common/http';

const httpHeadAuthorization = (): { headers: HttpHeaders } => {
  const token = localStorage['token'];

  return {
    headers: new HttpHeaders({
      Authorization: token,
    }),
  };
};

export { httpHeadAuthorization };
