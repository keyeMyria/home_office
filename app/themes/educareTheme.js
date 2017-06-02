import getTheme from './native/components';
import material from './native/variables/material';

const PRIMARY_COLOR = '#FF7043';
// const PRIMARY_COLOR_LIGHT = '#FF8A65';

const educareTheme = getTheme(material);

// Container
educareTheme['NativeBase.Container'] = Object.assign(educareTheme['NativeBase.Container'] || {}, {
  '.sideBarContainer': {
    backgroundColor: '#FFFFFF',
    'NativeBase.ListItem': {
      backgroundColor: PRIMARY_COLOR,
      paddingTop: 50,
      paddingBottom: 15,
      paddingLeft: 15,
      marginLeft: 0,
      'NativeBase.Left': {
        flex: 0,
      },
      'NativeBase.Body': {
        borderBottomWidth: 0,
        flex: 1,
        'NativeBase.Text': {
          color: '#FFFFFF',
          '.profileInfo': {
            fontSize: 12
          }
        }
      }
    }
  }
});

// List
educareTheme['NativeBase.List'] = Object.assign(educareTheme['NativeBase.List'] || {}, {
  '.sideBarMenuList': {
    'NativeBase.ListItem': {
      borderBottomWidth: 0,
      'NativeBase.Icon': {
        fontSize: 20,
        marginRight: 10
      }
    }
  },
  '.agendaList': {
    'NativeBase.ListItem': {
      marginLeft: 0,
      paddingRight: 10,
      paddingTop: 0,
      paddingBottom: 0
    }
  }
});

// FooterTab
educareTheme['NativeBase.FooterTab'] = Object.assign(educareTheme['NativeBase.FooterTab'] || {}, {
  '.footerTabNavigation': {
    'NativeBase.Button': {
      backgroundColor: PRIMARY_COLOR,
      padding: 0,
      '.active': {
        backgroundColor: PRIMARY_COLOR,
        'NativeBase.Icon': {
          color: '#FFFFFF'
        },
        'NativeBase.Text': {
          color: '#FFFFFF',
          fontSize: 12
        }
      },
      'NativeBase.Text': {
        color: '#FFCCBC',
        fontSize: 11
      },
      'NativeBase.Icon': {
        color: '#FFCCBC'
      }
    }
  }
});

// Header
educareTheme['NativeBase.Header'] = Object.assign(educareTheme['NativeBase.Header'] || {}, {
  '.appHeader': {
    backgroundColor: PRIMARY_COLOR,
    'NativeBase.Left': {
      'NativeBase.Icon': {
        color: '#FFFFFF'
      }
    }
  }
});

export default educareTheme;