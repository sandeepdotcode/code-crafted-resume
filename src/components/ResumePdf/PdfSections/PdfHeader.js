import { Link, StyleSheet, Text, View } from "@react-pdf/renderer";
import { GrMail } from "react-icons/gr"

const styles = StyleSheet.create({
  name: {
    fontSize: '24px',
  },
  title: {
    fontSize: '12px',
  },
  links: {
    fontSize: '12px',
  },
})

function Links({ email, web }) {
  return (
    <View style={styles.links}>
      <GrMail />
      <Text><Link src={'mailto:' + email }>{ email }</Link></Text>
      <Text><Link src={web.link}>{ web.text }</Link></Text>
    </View>
  )
}

function Header({ personal, links }) {
  return (
    <>
      <View>
        <Text style={styles.name}>{ personal.name }</Text>
        <Text style={styles.title}>{ personal.title }</Text>
      </View>
      <Links email={personal.email} web={links.web}/>
    </>
  )
}

export default Header;