import getTheme from './native/components';
import platform from './native/variables/platform';

const PRIMARY_COLOR = '#FF7043';
const PRIMARY_COLOR_LIGHT = '#FF8A65';

// const PRIMARY_COLOR = '#00897B';
// const PRIMARY_COLOR_LIGHT = '#4DB6AC';

const DEFAULT_TEXT_COLOR = '#000000';
const INVERSE_TEXT_COLOR = '#FFFFFF';

const educareTheme = getTheme(platform);

// Container
educareTheme['NativeBase.Container'] = Object.assign(educareTheme['NativeBase.Container'] || {}, {
  '.sideBarContainer': {
    backgroundColor: INVERSE_TEXT_COLOR,
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
          color: INVERSE_TEXT_COLOR,
          '.profileInfo': {
            fontSize: 11,
            fontStyle: 'italic'
          }
        }
      }
    }
  }
});

// List
educareTheme['NativeBase.List'] = Object.assign(educareTheme['NativeBase.List'] || {}, {
  '.sideBarMenuList': {
    'NativeBase.Separator': {
      backgroundColor: PRIMARY_COLOR_LIGHT,
      'NativeBase.Text': {
        color: INVERSE_TEXT_COLOR
      }
    },
    'NativeBase.ListItem': {
      borderBottomWidth: 0,
      'NativeBase.Text': {
        fontSize: 15
      },
      'NativeBase.Icon': {
        fontSize: 20,
        marginRight: 10,
        color: '#424242'
      }
    }
  },
  '.agendaList': {
    'NativeBase.Separator': {
      backgroundColor: PRIMARY_COLOR_LIGHT,
      'NativeBase.Text': {
        color: INVERSE_TEXT_COLOR,
        fontWeight: 'bold'
      }
    },
    'NativeBase.ListItem': {
      marginLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
      'NativeBase.Text': {
        fontSize: 13
      }
    }
  }
});

// FooterTab
educareTheme['NativeBase.FooterTab'] = Object.assign(educareTheme['NativeBase.FooterTab'] || {}, {
  '.footerTabNavigation': {
    'NativeBase.Button': {
      borderRadius: 0,
      padding: 0,
      '.active': {
        backgroundColor: PRIMARY_COLOR,
        'NativeBase.Icon': {
          color: INVERSE_TEXT_COLOR,
          fontSize: 20
        },
        'NativeBase.Text': {
          color: INVERSE_TEXT_COLOR,
          fontSize: 10
        }
      },
      'NativeBase.Icon': {
        color: PRIMARY_COLOR,
        fontSize: 20
      },
      'NativeBase.Text': {
        color: DEFAULT_TEXT_COLOR,
        fontSize: 10
      }
    }
  }
});

// Header
educareTheme['NativeBase.Header'] = Object.assign(educareTheme['NativeBase.Header'] || {}, {
  '.appHeader': {
    backgroundColor: PRIMARY_COLOR,
    'NativeBase.Left': {
      'NativeBase.Button': {
        backgroundColor: 'transparent',
        'NativeBase.Icon': {
          fontSize: 20,
          color: INVERSE_TEXT_COLOR
        }
      }
    },
    'NativeBase.Body': {
      'NativeBase.Title': {
        color: INVERSE_TEXT_COLOR
      }
    }
  }
});

// Card
// educareTheme['NativeBase.Card'] = Object.assign(educareTheme['NativeBase.Card'] || {}, {
//   '.mensagemAlerta': {
//     backgroundColor: PRIMARY_COLOR,
//     'NativeBase.CardItem': {
//       'NativeBase.Text': {
//         fontSize: 10
//       }
//     }
//   }
// });

export default educareTheme;