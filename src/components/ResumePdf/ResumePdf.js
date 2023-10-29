import { Page, Document, StyleSheet, usePDF, Font, View, Text } from "@react-pdf/renderer";
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
import PdfSkills from "./PdfSections/PdfSkills";
import PdfWork from "./PdfSections/PdfWork";
import PdfProjects from "./PdfSections/PdfProjects";
import PdfEdu from "./PdfSections/PdfEdu";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import PdfCertInt from "./PdfSections/PdfCertInt";
import fontSettings from "../../assets/fontSettings";

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
    fontFamily: fontSettings.regularFont,
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  summary: {
    fontSize: 12,
  }
});

function ResumePdf() {
  const added = useFormStore((state) => state.sections.added);
  const personal = useFormStore((state) => state.personal);
  const links = useFormStore((state) => state.links);
  const [ isSimpleSkills, skills, simpleSkills ] = useFormStore((state) => [
    state.isSimpleSkills, state.skills, state.simpleSkills
  ]);
  const workArray = useFormStore((state) => state.work);
  const projectsArray = useFormStore((state) => state.projects);
  const eduArray = useFormStore((state) => state.education);
  const certInt = useFormStore((state) => state.certInt);

  const pdfSections = added.map((section, index) => {
    switch (section) {
      case "skills":
        return (<PdfSkills isSimpleSkills={isSimpleSkills} skills={skills} simpleSkills={simpleSkills} key={section} />);
      case 'work':
        return (<PdfWork workArray={workArray} key={section} />);
      case 'projects':
        return (<PdfProjects projectsArray={projectsArray} key={section} />);
      case 'education':
        return (<PdfEdu eduArray={eduArray} key={section} />);
      case 'certInt':
        return (<PdfCertInt certInt={certInt} key={section} />);
      case 'personal':
      case 'links':
      default:
        return null;
    }
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Header personal={personal} links={links}/>
        { personal.summary !== '' && <View style={styles.summary}><Text>{ personal.summary }</Text></View>}
        { pdfSections }
      </Page>
    </Document>
  );
}

let NUM_PAGES = 1;

function ResumeViewer() {
  // eslint-disable-next-line no-unused-vars
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
        NUM_PAGES = loadedPdf._pdfInfo.numPages;
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
      <div className="resume-top-nav">
        <button type="button" onClick={() => { setCurrentPage(currentPage - 1) }} 
          disabled={currentPage < 2 ? true : false} className="resume-nav-btn">
          <FaAngleLeft />
        </button>
        <button type="button" className="download-btn" onClick={downloadPdf}><FiDownload></FiDownload> Download</button>
        <button type="button" onClick={() => { setCurrentPage(currentPage + 1) }} 
          disabled={currentPage === NUM_PAGES ? true : false} className="resume-nav-btn">
          <FaAngleRight />
        </button>
      </div>
      <canvas id="resume-viewer" ref={canvasRef}></canvas>
      <div className="resume-nav-div">
        <button type="button" onClick={() => { setCurrentPage(currentPage - 1) }} 
          disabled={currentPage < 2 ? true : false} className="resume-nav-btn">
          <FaAngleLeft /> Previous
        </button>
        <div className="page-indicator">Page { currentPage } of { NUM_PAGES }</div>
        <button type="button" onClick={() => { setCurrentPage(currentPage + 1) }} 
          disabled={currentPage === NUM_PAGES ? true : false} className="resume-nav-btn">
          Next <FaAngleRight />
        </button>
      </div>
    </div>
  )
}

export default ResumeViewer;
