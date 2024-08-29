import { background } from "@chakra-ui/react"

const palette = {
  black: '#1F2937',
  white: '#FFFFFF',
  blueMain: '#2563EB',
  blueSecondary: '#DBEAFE',
  blueThird: '#F3F8FF',
  grayMain: '#6B7280',
  graySecondary: '#E5E7EB',
  grayThird: '#F3F4F6',
  borderGray: '#E2E8F0',
  backgroundGray: '#F8FAFC',
  btnBackground: '#FDFDFD',
  disabledGray: '#D1D5DB',
  date: '#DCFCE7',
  local: '#E0F2FE',
  usage: '#FDF2F8',
  specific: '#FEFCE8',
  price: '#F3F4F6',
  status: '#FFEDD5',
  sendTo: '#EDE9FE',
  mine: '#F1F5F9',
  tooltip: '#F9FBFF'
}

const styles = {
  modal: {
    condition: {
      canceled: {
        height: '38px',
        border: `1px solid ${palette.graySecondary}`,
        backgroundColor: `${palette.white}`,
        padding: '8px'
      },
      save: {
        height: '38px',
        backgroundColor: `${palette.blueMain}`,
        padding: '8px'
      },
      btnGrid: {
        gridTemplateColumns: '120px 315px',
        columnGap: '15px',
        margin: '15px 0'
      },
      editSave: {
        height: '36px',
        backgroundColor: `${palette.blueMain}`,
        padding: '0 10px'
      },
      searchSave: {
        height: '32px',
        backgroundColor: `${palette.white}`,
        padding: '0px 8px',
        border: `0.5px solid ${palette.graySecondary}`,
        borderRadius: '4px',
        marginRight: '5px'
      },
      confirm: {
        btnGrid: {
          gridTemplateColumns: '152px 152px',
          columnGap: '15px',
          marginTop: '15px'
        },
        overBtn: {
          gridTemplateColumns: '320px',
          marginTop: '15px'
        }
      }
    },
    extra: {
      usageContent: {
        display: 'grid',
        columnGap: '10px',
        rowGap: '15px',
        margin: '10px',
        gridTemplateColumns: '184px 184px',
        gridTemplateRows: '1fr 1fr 1fr'
      },
      specificContent: {
        display: 'grid',
        columnGap: '10px',
        rowGap: '15px',
        margin: '10px',
        gridTemplateColumns: '184px 184px 184px',
        gridTemplateRows: '1fr 1fr 1fr 1fr'
      },
      buttonBox: {
        height: '67px',
        borderTop: `1px solid ${palette.graySecondary}`,
        padding: '15px',
        backgroundColor: `${palette.grayThird}`,
        borderBottomLeftRadius: '16px',
        borderBottomRightRadius: '16px'
      }
    },
  },
  pagination: {
    btn: {
      height: '38px',
      border: `1px solid ${palette.graySecondary}`,
      backgroundColor: `${palette.white}`,
      padding: '5px 10px'
    }
  },
  filter: {
    inputContainer: {
      date: {
        width: '680px'
      },
      current: {
        width: '334px'
      }
    },
    inputBox: {
      date: {
        width: '120px'
      },
      current: {
        width: '90px'
      }
    }
  }
}

export const theme = {
  palette,
  styles
}

export type ThemeType = keyof typeof theme