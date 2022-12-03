import { useEffect, useRef } from 'react';

const UploadWidget = ({ children, onUpload }) => {
  const cloudinary = useRef();
  const widget = useRef();

  // Store the Cloudinary window instance to a ref when the page renders

  useEffect(() => {
    // @ts-ignore
    cloudinary.current = window.cloudinary;
  }, []);

  /**
   * createWidget
   * @description Creates a new instance of the Cloudinary widget and stores in a ref
   */

  function createWidget() {
    // Providing only a Cloud Name along with an Upload Preset allows you to use the
    // widget without requiring an API Key or Secret. This however allows for
    // "unsigned" uploads which may allow for more usage than intended. Read more
    // about unsigned uploads at: https://cloudinary.com/documentation/upload_images#unsigned_upload

    const options = {
      cloudName: 'dim9vodlx',
      uploadPreset: 'blockpe',
    };

    // @ts-ignore
    return cloudinary.current?.createUploadWidget(
      options,
      // @ts-ignore
      function (error, result) {
        // The callback is a bit more chatty than failed or success so
        // only trigger when one of those are the case. You can additionally
        // create a separate handler such as onEvent and trigger it on
        // ever occurance
        if (error || result.event === 'success') {
          onUpload(error, result, widget?.current);
        }
      }
    );
  }

  /**
   * open
   * @description When triggered, uses the current widget instance to open the upload modal
   */

  function open() {
    console.log('open');
    if (!widget?.current) {
      widget.current = createWidget();
    }
    // @ts-ignore
    widget?.current && widget.current.open();
  }

  return (
    <>
      {children({
        cloudinary: cloudinary.current,
        widget: widget.current,
        open,
      })}
    </>
  );
};

export default UploadWidget;
