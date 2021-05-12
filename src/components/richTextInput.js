import React, { useState } from 'react'
import { client } from '../../src/apollo/client'
import ReactQuill, { Quill } from 'react-quill'
import Toast from '../components/toast'

import * as Emoji from 'quill-emoji'

import { UPLOAD_IMAGE } from '../../src/apollo/gql/projects'

import 'react-quill/dist/quill.snow.css'
import 'quill-emoji/dist/quill-emoji.css'
import QuillImageDropAndPaste from 'quill-image-drop-and-paste'
import ImageUploader from './richImageUploader/imageUploader'

window.Quill = Quill

const ImageResize = require('quill-image-resize-module').default

Quill.register('modules/imageUploader', ImageUploader)
Quill.register('modules/emoji', Emoji)
Quill.register('modules/ImageResize', ImageResize)
Quill.register('modules/imageDropAndPaste', QuillImageDropAndPaste)

const QuillVideo = Quill.import('formats/video')
const BlockEmbed = Quill.import('blots/block/embed')

const VIDEO_ATTRIBUTES = ['height', 'width']

// provides a custom div wrapper around the default Video blot
class Video extends BlockEmbed {
  static create(value) {
    const iframeNode = QuillVideo.create(value)
    const node = super.create()
    node.appendChild(iframeNode)
    return node
  }

  static formats(domNode) {
    const iframe = domNode.getElementsByTagName('iframe')[0]
    return VIDEO_ATTRIBUTES.reduce(function (formats, attribute) {
      if (iframe.hasAttribute(attribute)) {
        formats[attribute] = iframe.getAttribute(attribute)
      }
      return formats
    }, {})
  }

  static value(domNode) {
    return domNode.getElementsByTagName('iframe')[0].getAttribute('src')
  }

  format(name, value) {
    if (VIDEO_ATTRIBUTES.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value)
      } else {
        this.domNode.removeAttribute(name)
      }
    } else {
      super.format(name, value)
    }
  }
}

Video.blotName = 'video'
Video.className = 'ql-video-wrapper'
Video.tagName = 'DIV'

Quill.register(Video, true)

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' }
    ],
    ['link', 'image', 'video'],
    // ['emoji'],
    ['clean']
  ],
  'emoji-toolbar': true,
  'emoji-textarea': false,
  'emoji-shortname': true,
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  },
  imageDropAndPaste: {},
  ImageResize: {},
  imageUploader: {
    // HERE: TODO ADD CUSTOM IMAGE UPLOADER
    upload: async file => {
      try {
        Toast({
          content: 'Uploading image, please wait'
        })
        const { data: imageUploaded } = await client.mutate({
          mutation: UPLOAD_IMAGE,
          variables: { imageUpload: { image: file, projectId: 0 } }
        })
        return imageUploaded?.uploadImage
      } catch (error) {
        console.log({ error })
        return null
      }

      // return new Promise((resolve, reject) => {
      //   setTimeout(() => {
      //     resolve(
      //       'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/480px-JavaScript-logo.png'
      //     )
      //   }, 3500)
      // })
    }
  }
}

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video'
]

function TextRichWithQuill(props) {
  // console.log({ value })
  return (
    <ReactQuill
      modules={modules}
      formats={formats}
      theme='snow'
      ref={props?.ref}
      id={props?.id}
      name={props?.name}
      value={props?.value}
      defaultValue={props?.defaultValue}
      onChange={props?.onChange}
      style={props?.style}
    />
  )
}

export default TextRichWithQuill
