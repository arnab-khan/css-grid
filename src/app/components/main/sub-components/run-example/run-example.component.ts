import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { gridTutorialCode } from '../../../../interface/grid-toturial-code-list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-run-example',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MonacoEditorModule
  ],
  templateUrl: './run-example.component.html',
  styleUrl: './run-example.component.scss'
})

export class RunExampleComponent implements OnChanges {

  @Input() gridTutorialCode: gridTutorialCode = {
    htmlCode: '',
    cssCode: ''
  }

  @Input() size: {
    editorHeight?: number;
    outputHeight?: number;
    outputMinWidth?: number;
  } | undefined

  outputCode: SafeHtml = '';
  editorOptionsCss = { theme: 'vs-dark', language: 'css' };  //for documentation visit https://www.npmjs.com/package/ngx-monaco-editor-v2
  editorOptionsHtml = { theme: 'vs-dark', language: 'html' };  //for documentation visit https://www.npmjs.com/package/ngx-monaco-editor-v2
  iframeSrc: any;
  editorLoader = -2;


  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['gridTutorialCode']) {
      this.setOutputCode();
    }
  }

  changeHtml(event: any) {
    this.gridTutorialCode.htmlCode = event;
    this.setOutputCode();
  }

  changeCss(event: any) {
    this.gridTutorialCode.cssCode = event;
    this.setOutputCode();
  }

  setOutputCode() {
    const outputCode = `
      <style>${this.gridTutorialCode.cssCode}</style>
      ${this.gridTutorialCode.htmlCode}
    `;
    // Sanitize the output HTML
    this.outputCode = this.sanitizer.bypassSecurityTrustHtml(outputCode);
    // console.log('outputCode', outputCode);
  }

  generateDataUrl(html: SafeHtml): string {
    const htmlString = html ? html.toString() : '';
    const encodedHtml = encodeURIComponent(htmlString);
    return `data:text/html;charset=utf-8,${encodedHtml}`;
  }

  editorOnInit() {
    this.editorLoader++;
  }

}
