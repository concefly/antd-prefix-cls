const {
  withProps
} = require('./util');

const prefixWrapper = antPrefix => (Comp, name) => {
  const compName = (name || Comp.name).toLowerCase();
  switch (compName) {
    case 'button':
      return Object.assign(withProps({
        prefixCls: `${antPrefix}-btn`
      })(Comp), {
        Group: withProps({
          prefixCls: `${antPrefix}-btn-group`
        })(Comp.Group),
      });

    case 'divider':
      return withProps({
        prefixCls: antPrefix
      })(Comp);

      // layout 组件识别出来的 name 是 adapter
    case 'layout':
    case 'adapter':
      return Object.assign(withProps({
        prefixCls: `${antPrefix}-layout`
      })(Comp), {
        Header: withProps({
          prefixCls: `${antPrefix}-layout-header`
        })(Comp.Header),
        Footer: withProps({
          prefixCls: `${antPrefix}-layout-footer`
        })(Comp.Footer),
        Content: withProps({
          prefixCls: `${antPrefix}-layout-content`
        })(Comp.Content),
        Sider: withProps({
          prefixCls: `${antPrefix}-layout-sider`
        })(Comp.Sider),
      });

    case 'input':
      return Object.assign(withProps({
        prefixCls: `${antPrefix}-input`
      })(Comp), {
        Search: withProps({
          prefixCls: `${antPrefix}-input-search`,
          inputPrefixCls: `${antPrefix}-input`,
        })(Comp.Search),
        TextArea: withProps({
          prefixCls: `${antPrefix}-input`,
        })(Comp.TextArea),
        Group: withProps({
          prefixCls: `${antPrefix}-input`,
        })(Comp.Group),
      });

    case 'inputnumber':
      return withProps({
        prefixCls: `${antPrefix}-input-number`
      })(Comp)

    case 'table':
      return Object.assign(
        withProps({
          prefixCls: `${antPrefix}-table`
        }, props => ({
          ...props,
          pagination: {
            ...props.pagination,
            prefixCls: `${antPrefix}-pagination`,
          },
        }))(Comp), {}
      );

    case 'message':
      {
        Comp.config({
          prefixCls: `${antPrefix}-message`
        });
        return Comp;
      }

    case 'notification':
      {
        // monkey patch
        ['success', 'error', 'info', 'warn', 'warning', 'open'].forEach(methodName => {
          let oldMethod = Comp[methodName];
          Comp[methodName] = props => oldMethod({
            prefixCls: `${antPrefix}-notification`,
            ...props,
          })
        });
        return Comp;
      }

    case 'modal':
      {
        const re = withProps({
            prefixCls: `${antPrefix}-modal`,
          },
          props => ({
            ...props,
            okButtonProps: {
              ...props.okButtonProps,
              prefixCls: `${antPrefix}-btn`,
            },
            cancelButtonProps: {
              ...props.cancelButtonProps,
              prefixCls: `${antPrefix}-btn`,
            },
          })
        )(Comp);
        ['info', 'success', 'error', 'warning', 'warn', 'confirm'].forEach(method => {
          re[method] = props =>
            Comp[method]({
              prefixCls: `${antPrefix}-modal`,
              ...props,
              // 给 model 里的 button 传入 prefixCls
              okButtonProps: {
                ...props.okButtonProps,
                prefixCls: `${antPrefix}-btn`,
              },
              cancelButtonProps: {
                ...props.cancelButtonProps,
                prefixCls: `${antPrefix}-btn`,
              },
            });
        });
        return re;
      }

    default:
      {
        const propsDecorator = withProps({
          prefixCls: `${antPrefix}-${compName}`
        });
        const Re = propsDecorator(Comp);
        Object.keys(Comp).forEach(propertyName => {
          if (['childContextTypes', 'defaultProps'].indexOf(propertyName) >= 0) return;
          const property = Comp[propertyName];
          // 组件复制时，要包一层 prefixCls
          if (property.prototype && property.prototype.render) {
            Re[propertyName] = propsDecorator(property);
          } else {
            Re[propertyName] = property;
          }
        });
        return Re;
      }
  }
};

module.exports = {
  prefixWrapper,
};