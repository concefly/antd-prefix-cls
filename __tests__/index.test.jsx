const React = require('react');
const antd = require('antd');
const renderer = require('react-test-renderer');
const { prefixWrapper } = require('../lib');

function dump(app) {
  return renderer.create(app).toJSON();
}
exports.dump = dump;

it('alert', () => {
  const Alert = prefixWrapper('fd')(antd.Alert);
  expect(dump(<Alert message="Success Text" type="success" />)).toMatchSnapshot();
});

it('badge', () => {
  const Badge = prefixWrapper('fd')(antd.Badge);
  expect(dump(<Badge count={0} />)).toMatchSnapshot();
});

it('button', () => {
  const Button = prefixWrapper('fd')(antd.Button);
  const ButtonGroup = Button.Group;
  expect(
    dump(
      <Button type="primary" size="large">
        aaa
      </Button>
    )
  ).toMatchSnapshot();
  expect(
    dump(
      <ButtonGroup>
        <Button>Cancel</Button>
      </ButtonGroup>
    )
  ).toMatchSnapshot();
});

it('row col', () => {
  const Row = prefixWrapper('fd')(antd.Row);
  const Col = prefixWrapper('fd')(antd.Col);
  expect(
    dump(
      <Row>
        <Col span={24}>col</Col>
      </Row>
    )
  ).toMatchSnapshot();
});

it('input', () => {
  const Input = prefixWrapper('fd')(antd.Input);
  expect(dump(<Input placeholder="Basic usage" />)).toMatchSnapshot();
  expect(dump(<Input.Search />)).toMatchSnapshot();
  expect(dump(<Input.TextArea />)).toMatchSnapshot();
  expect(dump(<Input.Group />)).toMatchSnapshot();
});

it('inputNumber', () => {
  const InputNumber = prefixWrapper('fd')(antd.InputNumber);
  expect(dump(<InputNumber />)).toMatchSnapshot();
});

it('menu', () => {
  const Menu = prefixWrapper('fd')(antd.Menu);
  expect(
    dump(
      <Menu>
        <Menu.Item>菜单项</Menu.Item>
        <Menu.SubMenu title="子菜单">
          <Menu.Item>子菜单项</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    )
  ).toMatchSnapshot();
});

it('layout', () => {
  const Layout = prefixWrapper('fd')(antd.Layout);
  const { Header, Footer, Sider, Content } = Layout;
  expect(
    dump(
      <Layout>
        <Header>Header</Header>
        <Layout>
          <Sider>Sider</Sider>
          <Content>Content</Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    )
  ).toMatchSnapshot();
});

it('Divider', () => {
  const Divider = prefixWrapper('fd')(antd.Divider);
  expect(dump(<Divider />)).toMatchSnapshot();
  expect(dump(<Divider type="vertical" />)).toMatchSnapshot();
});

it.skip('Table', () => {
  const Table = prefixWrapper('fd')(antd.Table);
  expect(dump(<Table pagination={{ defaultCurrent: 1, total: 10 }} />)).toMatchSnapshot();
});
