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
      <style>
        /* ========== start scrollbar customise ========== */
        @media (min-width: 481px) {
          :root {
              --scrollbar-track-color: #f5f5f5;
              --scrollbar-thumb-color: #888;
              --scrollbar-shadow-color: rgba(0, 0, 0, 0.5);
          }
          html {
              height: 100%;
              overflow-y: auto;
          }
          html::-webkit-scrollbar {
              width: .7rem;
              height: .7rem;
          }
          html::-webkit-scrollbar-track {
              border-radius: 0.625rem;
              box-shadow: inset 0 0 0.375rem var(--scrollbar-shadow-color);
              background-color: var(--scrollbar-track-color);
          }
          html::-webkit-scrollbar-thumb {
              background-color: var(--scrollbar-thumb-color);
              border-radius: 0.625rem;
          }
          html::-webkit-scrollbar-thumb:hover {
              background-color: var(--scrollbar-thumb-color);
          }
        }
        /* ========== end scrollbar customise ========== */
        ${this.gridTutorialCode.cssCode}
      </style>
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
