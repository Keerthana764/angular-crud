import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
  // Import HttpClientModule here
import { AppComponent } from './app.component';
  // Add your component here
import { EmployeeService } from './employee.service'; // Import the service for CRUD operations

@NgModule({
  declarations: [
    AppComponent,
     // Declare your component here
  ],
  imports: [
    BrowserModule,
    HttpClientModule  // Add it to the imports array
  ],
  providers: [EmployeeService],  // Register the service here
  bootstrap: [AppComponent]
})
export class AppModule { }
