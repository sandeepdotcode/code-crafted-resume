import { StyleSheet } from "@react-pdf/renderer";
import fontSettings from "../../../assets/fontSettings";

const commonStyles = StyleSheet.create({
  bulletBlock: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 2,
    marginBottom: 2,
  },
  heading: {
    fontSize: 12,
    fontFamily: fontSettings.regularFont,
    fontWeight: 700,
    borderBottom: '0.5 solid #000',
    marginBottom: 5,
  },
  workHeaderLine: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 12,
  },
  boldText: {
    fontSize: 12,
    fontWeight: 700,
  },
  normalTextLine: {
    fontSize: 12,
    display: 'flex',
    flexDirection: 'row',
  },
  link: {
    color: '#0a52cf',
  },
});

export default commonStyles;
