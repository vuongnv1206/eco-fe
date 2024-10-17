// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { NavigationStart, Router } from '@angular/router';
import { AuthStore } from './app/shared/stores/auth.store';


  // platformBrowserDynamic().bootstrapModule(AppModule)
  //   .catch(err => console.error(err));
 
const platform = platformBrowserDynamic();

platform.bootstrapModule(AppModule).then(appModuleRef => {
  const injector = appModuleRef.injector;
  const authStore = injector.get(AuthStore); // Sử dụng AuthStore
  const router = injector.get(Router);

  // Kiểm tra xác thực ngay khi ứng dụng khởi động
  authStore.checkAuth();

  // Guard router
  router.events.subscribe(event => {
    if (event instanceof NavigationStart) {
      const requiresAuth = router.routerState.snapshot.root.firstChild?.data?.['requiresAuth'];

      // Nếu yêu cầu xác thực và người dùng chưa xác thực, điều hướng đến trang đăng nhập
      if (requiresAuth && !authStore.isAuthenticated()) {
        router.navigate(['/login']);
      }
    }
  });

}).catch(err => console.error(err));