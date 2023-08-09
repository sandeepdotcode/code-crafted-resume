import { StyleSheet } from "@react-pdf/renderer";

const commonStyles = StyleSheet.create({
  bulletBlock: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 2,
    marginBottom: 2,
  },
  heading: {
    fontSize: 12,
    fontFamily: 'Garamond',
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
  }
});

export default commonStyles;