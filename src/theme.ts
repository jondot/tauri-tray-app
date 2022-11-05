import { theme as defaultTheme, extendTheme } from '@chakra-ui/react'

const theme = {
  styles: {
    global: {
      body: {
        fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11"',
        fontFamily: 'system-ui, helvetica, arial, sans-serif',
        letterSpacing: '-0.02em',
      },
    },
  },
  colors: {
    brand: {
      900: '#1a365d',
      800: '#153e75',
      700: '#2a69ac',
    },
  },
  components: {
    Button: {
      variants: {
        action: (props: any) => ({
          ...defaultTheme.components.Button.variants!.outline(props),
          width: '100%',
        }),
      },
    },
  },
}
export default extendTheme(theme)
