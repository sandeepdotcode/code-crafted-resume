import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  bullet: {
    display: 'flex',
    flexDirection: 'row',
  },
  bulletText: {
    fontSize: 12,
    maxWidth: '95%',
  },
  bulletDot: {
    fontSize: 18,
    verticalAlign: 'super',
    paddingTop: 3,
    lineHeight: 0.5,
  }
})

function Bullet({ bullet }) {
  return (
    <View style={styles.bullet}>
      <Text style={styles.bulletDot}>•   </Text>
      <Text style={styles.bulletText}>
        { bullet.text }
      </Text>
    </View>
  );
}

export default Bullet;
