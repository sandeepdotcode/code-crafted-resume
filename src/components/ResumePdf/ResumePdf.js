import { Page, Text, View, Document, StyleSheet, usePDF, Font } from "@react-pdf/renderer";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/webpack";
import { useCallback, useEffect, useRef, useState } from "react";
import useFormStore from "../../store";
import { FiDownload } from "react-icons/fi";
import { saveAs } from "file-saver";
import Header from "./PdfSections/PdfHeader";
import garamond from '../../assets/garamond-font/cormorant-garamond-v16-latin-regular.ttf';
import garamondItalic from '../../assets/garamond-font/cormorant-garamond-v16-latin-italic.ttf';
import garamondBold from '../../assets/garamond-font/cormorant-garamond-v16-latin-700.ttf';

Font.register({ 
  family: 'Garamond',
  fonts: [
    { src: garamond },
    { src: garamondItalic, fontStyle: 'italic' },
    { src: garamondBold, fontWeight: 700 },
  ]
})

// pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.js',
//   import.meta.url,
// ).toString();

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Garamond',
    display: 'flex',
    flexDirection: 'column',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
});

function ResumePdf() {
  const personal = useFormStore((state) => state.personal);
  const links = useFormStore((state) => state.links);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Header personal={personal} links={links}/>
      </Page>
    </Document>
  );
}

function ResumeViewer() {
  const [instance, updateInstance] = usePDF({ document: ResumePdf() });
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
  const canvasRef = useRef(null);

  const [pdfRef, setPdfRef] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const renderPage = useCallback((pageNum, pdf = pdfRef) => {
    pdf && pdf.getPage(pageNum).then((page) => {
      const viewPort = page.getViewport({scale: 1.5});
      const canvas = canvasRef.current;
      canvas.height = viewPort.height;
      canvas.width = viewPort.width;

      const renderContext = {
        canvasContext: canvas.getContext('2d'),
        viewport: viewPort
      };
      page.render(renderContext);
    })
  }, [pdfRef]);

  useEffect(() => {
    renderPage(currentPage, pdfRef);
  }, [pdfRef, currentPage, renderPage]);

  useEffect(() => {
    if(!instance.loading) {
      const loadingTask = pdfjsLib.getDocument(instance.url);
      loadingTask.promise.then((loadedPdf) => {
        setPdfRef(loadedPdf);
      }, function (reason) {
        console.error(reason);
      }); 
    }
  }, [instance]);

  const downloadPdf = () => {
    saveAs(instance.url, "resume.pdf");
  }

  return (
    <div className="resume-container">
      <button type="button" className="download-btn" onClick={downloadPdf}><FiDownload></FiDownload> Download</button>
      <canvas id="resume-viewer" ref={canvasRef}></canvas>
    </div>
  )
}

export default ResumeViewer;