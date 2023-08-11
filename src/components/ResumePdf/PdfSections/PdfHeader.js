import { Link, StyleSheet, Text, View } from "@react-pdf/renderer";
import commonStyles from "./commonStyles";


const styles = StyleSheet.create({
  header: {
    borderBottom: '0.5 solid #000',
    paddingBottom: 3,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Garamond',
    fontWeight: 700,
  },
  title: {
    fontSize: '12px',
  },
  links: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: '10px',
    fontSize: '12px',
  },
})

function Links({ email, links }) {
  return (
    <View style={styles.links}>
      <Text><Link src={'mailto:' + email } style={commonStyles.link}>{ email }</Link></Text>
      <Text><Link src={ links.web.link } style={commonStyles.link}>{ links.web.text }</Link></Text>
      <Text><Link src={ links.linkedin.link } style={commonStyles.link}>{ links.linkedin.text }</Link></Text>
      <Text><Link src={ links.github.link } style={commonStyles.link}>{ links.github.text }</Link></Text>
    </View>
  )
}

function Header({ personal, links }) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.name}>{ personal.name }</Text>
        <Text style={styles.title}>{ personal.title }</Text>
      </View>
      <Links email={personal.email} links={links} />
    </View>
  )
}

export default Header;