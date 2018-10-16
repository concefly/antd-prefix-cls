const React = require('react');

const withProps = (defaultProps, rewriteProps) => Comp =>
  class extends React.PureComponent {
    static displayName = Comp.displayName || Comp.name || '';
    static defaultProps = defaultProps;
    render() {
      const transformedProps = rewriteProps ? rewriteProps(this.props) : this.props;
      return <Comp {...transformedProps} />;
    }
  };

const plantAutoPrefix = (
  prefixCls,
  extraPropertyDecorator,
  ignores = ['childContextTypes']
) => Comp => {
  const propsDecorator = withProps({ prefixCls });
  const Re = propsDecorator(Comp);

  // 复制类属性
  Object.keys(Comp)
    // 只保留非 ignore 的属性
    .filter(propertyName => ignores.indexOf(propertyName) < 0)
    .forEach(propertyName => {
      const property = Comp[propertyName];
      // 组件复制时，要包一层 prefixCls
      if (property.prototype && property.prototype.render) {
        Re[propertyName] = propsDecorator(property);
      } else {
        Re[propertyName] = property;
      }
      // 提供了扩展装饰器，则再包一下
      if (extraPropertyDecorator) {
        Re[propertyName] = extraPropertyDecorator(Re[propertyName], propertyName);
      }
    });

  return Re;
};

module.exports = {
  withProps,
  plantAutoPrefix,
};
