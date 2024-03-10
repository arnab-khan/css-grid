import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

@Component({
  selector: 'app-run-example',
  standalone: true,
  imports: [
    FormsModule,
    MonacoEditorModule
  ],
  templateUrl: './run-example.component.html',
  styleUrl: './run-example.component.scss'
})
export class RunExampleComponent {
  outputCode: SafeHtml='';
  editorOptionsCss = { theme: 'vs-dark', language: 'css' };  //for documentation visit https://www.npmjs.com/package/ngx-monaco-editor-v2
  codeCss: string = `.container {
    display: grid;
}`;
  editorOptionsHtml = { theme: 'vs-dark', language: 'html' };  //for documentation visit https://www.npmjs.com/package/ngx-monaco-editor-v2
  codeHtml: string = `<div class="container">
<div>Item 1</div>
<div>Item 2</div>
<div>Item 3</div>
</div>`;
  iframeSrc: any;


constructor(
  private sanitizer: DomSanitizer
  ) {}

  call(event: any) {
    console.log(event);

  }

  changeHtml(event: any){
    console.log(event);
    
    this.codeHtml=event;
    this.setOutputCode();
  }

  changeCss(event: any){
    console.log(event);
    this.codeCss=event;
    this.setOutputCode();
  }

  setOutputCode() {
    const outputCode = `
    <style>${this.codeCss}</style>
    ${this.codeHtml}
  `;
  // Sanitize the output HTML
  this.outputCode = this.sanitizer.bypassSecurityTrustHtml(outputCode);
  console.log(outputCode);
  
}

  generateDataUrl(html: SafeHtml): string {
    const htmlString = html ? html.toString() : '';
    const encodedHtml = encodeURIComponent(htmlString);
    return `data:text/html;charset=utf-8,${encodedHtml}`;
  }
  
}
