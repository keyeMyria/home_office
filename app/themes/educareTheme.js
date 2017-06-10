import getTheme from './native/components';
import material from './native/variables/material';

const educareTheme = getTheme(material);

// Container
educareTheme['NativeBase.Container'] = Object.assign(educareTheme['NativeBase.Container'] || {}, {
  backgroundColor: '#FFFFFF',
  '.sideBarContainer': {
    'NativeBase.ListItem': {
      backgroundColor: material.PRIMARY_COLOR,
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
      '.last': {
        borderBottomWidth: 1,
      },
      borderBottomWidth: 0,
      'NativeBase.Icon': {
        fontSize: 21,
        marginRight: 10,
        color: '#424242'
      },
      'NativeBase.Text': {
        color: '#424242'
      },
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
      borderRadius: 0,
      padding: 0,
      '.active': {
        'NativeBase.Icon': {
          color: '#FFFFFF'
        },
        'NativeBase.Text': {
          color: '#FFFFFF',
          fontSize: 12
        }
      },
      'NativeBase.Text': {
        fontSize: 11
      }
    }
  }
});

// Tab
educareTheme['NativeBase.Tab'] = Object.assign(educareTheme['NativeBase.Tab'] || {}, {
  'NativeBase.TabHeading': {
    '.active': {
      'NativeBase.Text': {
        color: '#FFFFFF'
      }
    }
  }
});

// Header
educareTheme['NativeBase.Header'] = Object.assign(educareTheme['NativeBase.Header'] || {}, {
  '.appHeader': {
    borderBottomWidth: 0,
    'NativeBase.Left': {
      'NativeBase.Icon': {
        color: '#FFFFFF'
      }
    },
    'NativeBase.Right': {
      'NativeBase.Icon': {
        color: '#FFFFFF'
      },
      'NativeBase.Text': {
        color: '#FFFFFF',
        fontWeight: 'bold'
      }
    }
  }
});

// Card
educareTheme['NativeBase.Card'] = Object.assign(educareTheme['NativeBase.Card'] || {}, {
  '.cardAlert': {
    'NativeBase.CardItem': {
      '.readed': {
        backgroundColor: '#DCEDC8'
      },
      '.unreaded': {
        backgroundColor: '#ffcdd2'
      },
      'NativeBase.Body': {
        'NativeBase.Text': {
          '.title': {
            paddingBottom: 10,
            fontWeight: 'bold'
          }
        }
      }
    }
  }
});

const styles = {
  bubbleMenuItemView: {
    margin: 5,
    alignItems: 'center'
  },
  bubbleMenuItemText: {
    fontSize: 12
  },
  bubbleMenuItemActive: {
    borderColor: material.PRIMARY_COLOR,
    borderWidth: 3
  },
  bubbleMenuItemInactive: {
    borderColor: '#E0E0E0',
    borderWidth: 1
  },
  bubbleMenuView: {
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#E0E0E0'
  },
  gridColumn: {
    height: 55,
    alignItems: 'center'
  },
  gridColumnAlignLeft: {
    height: 55,
    alignItems: 'flex-start'
  },
  gridRowText: {
    fontSize: 14
  }
};

export {
  educareTheme,
  styles
};