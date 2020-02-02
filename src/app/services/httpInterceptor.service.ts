import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  constructor() {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authReq = req.clone({ headers: this.getAuthOptions() });

    return next.handle(authReq).pipe(
      tap(event => {}),
      catchError(err => {
        const result = this.handleError(err, req.url);
        return result;
      })
    );
  }

  public getDefaultOptions(): HttpHeaders {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return headers;
  }

  public getAuthOptions(): HttpHeaders {
    const token = sessionStorage.getItem("userToken");
    // if not logged in no token and not connectionId is used. So either we use signalrId + token to request or nothing.
    // but additonal cases added to prevent errors on startup/debugging etc.
    if (token && token.length > 0) {
      const headers = new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Authorization", token);
      return headers;
    } else {
      const headers = new HttpHeaders().set("Content-Type", "application/json");
      return headers;
    }
  }

  private handleError(
    error: HttpErrorResponse,
    nodeUrl: string
  ): Observable<any> {
    const result = error.message;
    return throwError(result);
  }
}
