import { Page, Text, View, Document, StyleSheet, usePDF } from "@react-pdf/renderer";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/webpack";
import { useCallback, useEffect, useRef, useState } from "react";

// pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.js',
//   import.meta.url,
// ).toString();

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4', 
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

function ResumePdf() {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
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
      const viewPort = page.getViewport({scale: 1.0});
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

  // if (instance.loading) {
  //   return (<div>Loading ...</div>);
  // }

  // pdfjsLib.getDocument(instance.url).promise.then((doc) => {
  //   console.log(doc._pdfInfo);

  //   doc.getPage(1).then((page) => {
      
  //   })
  // })

  return (
    <div className="resume-container">
      <canvas id="resume-viewer" ref={canvasRef}></canvas>
    </div>
  )
}

export default ResumeViewer;