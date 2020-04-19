import React, { Component } from 'react';
import Autodesk from 'Autodesk'
// import THREE from 'THREE'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewer: null,
      options: {
        src: process.env.PUBLIC_URL + 'model/3d.svf',
        env: 'Local'
      }
    }
  }
  componentDidMount() {
    this.loadViewer()
  }
  componentWillUnmount() {
  }
  loadViewer () {
    const state = this.state
    const viewer = new Autodesk.Viewing.Private.GuiViewer3D(document.getElementById('viewer'), {})
    this.setState({viewer: viewer})
    Autodesk.Viewing.Initializer(state.options, function () {
      viewer.initialize()
      viewer.setLightPreset(8) // 使用第八个环境背景
      viewer.setReverseZoomDirection(true) // 反转滚轮缩放方向

      viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, function (e) {
        console.log('材质加载完毕！')
      })
      viewer.addEventListener(Autodesk.Viewing.OBJECT_TREE_CREATED_EVENT, function (e) {
        console.log('模型树加载完毕！')
      })
      viewer.addEventListener(Autodesk.Viewing.AGGREGATE_SELECTION_CHANGED_EVENT, function (e) {
        // getAggregateSelection和getSelection方法是得到当前选择集的对象集合（DbId数组），前者是获取多个模型中的选择集，后者是获取单个模型。
        const sel = viewer.getSelection()
        console.log(sel)
        // 也可使用e里的数据
        // console.log(e)
      })

      viewer.loadModel(state.options.src)
    })
  }
  render() {
    return <div>
      <div id="viewer"></div>
    </div>
  }
}

export default Home