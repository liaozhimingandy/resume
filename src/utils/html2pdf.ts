import html2canvas from 'html2canvas';
import JsPDF from 'jspdf';

export const downloadPDF = (
    el: HTMLElement,
    pdfName: string,
    preview: boolean,
    callback: Function
): void => {
    let eleW: number = el.offsetWidth; // 获得该容器的宽
    let eleH: number = el.offsetHeight; // 获得该容器的高

    let eleOffsetTop: number = el.offsetTop; // 获得该容器到文档顶部的距离
    let eleOffsetLeft: number = el.offsetLeft; // 获得该容器到文档最左的距离

    let canvas: HTMLCanvasElement = document.createElement('canvas');
    let abs: number = 0;
    let win_in: number = document.documentElement.clientWidth || document.body.clientWidth; // 获得当前可视窗口的宽度（不包含滚动条）
    let win_out: number = window.innerWidth; // 获得当前窗口的宽度（包含滚动条）

    if (win_out > win_in) {
        abs = (win_out - win_in) / 2; // 获得滚动条宽度的一半
    }
    canvas.width = eleW * 2; // 将画布宽&&高放大两倍
    canvas.height = eleH * 2;

    let context: any = canvas.getContext('2d');
    context.scale(2, 2);
    context.translate(-eleOffsetLeft - abs, -eleOffsetTop);

    html2canvas(el, {
        scale: 2, // 设置缩放
        useCORS: true, // 允许canvas画布内 可以跨域请求外部链接图片, 允许跨域请求。,
        logging: false // 打印日志用的 可以不加默认为false
    }).then((canvas) => {
        //a4纸的尺寸[210,295]，html页面生成的canvas在pdf中图片的宽高
        const pdfWidth = 210; // PDF 宽度 (mm)
        const pdfHeight = 295; // PDF 高度 (mm)

        // el.setAttribute("crossOrigin",'anonymous');
        let contentWidth = canvas.width;
        let contentHeight = canvas.height;
        // 一页pdf显示html页面生成的canvas高度;
        let pageHeight = (contentWidth / pdfWidth) * pdfHeight;
        // 剩下pdf的html页面高度
        let leftHeight = contentHeight;
        // 页面Y轴偏移
        let position = 0;

        let pageData = canvas.toDataURL('image/jpeg', 1.0);
        let pdf = new JsPDF({orientation: 'p', unit: 'mm', format: [pdfWidth, pdfHeight]});

        if (leftHeight < pageHeight) {
            // 处理第一页
            //在pdf.addImage(pageData, 'JPEG', 左，上，宽度，高度)设置在pdf中显示；
            pdf.addImage(pageData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        } else {
            // 分页
            while (leftHeight > 0) {
                // position =
                pdf.addImage(pageData, 'JPEG', 0, position, pdfWidth, (pdfWidth / contentWidth) * contentHeight);
                leftHeight -= pageHeight;
                position -= pdfHeight;
                //避免添加空白页
                if (leftHeight > 0) {
                    pdf.addPage();
                }
            }
        }

        if (preview) {
            let dataUrl = pdf.output('datauristring');
            console.log('pdf', pdf.output('datauristring'));
            callback(dataUrl);
            return
        }
        //可动态生成
        pdf.save(pdfName);
        callback();
    });
};

export const generatePdf = (el: HTMLElement,
                            pdfName: string,
                            preview: boolean,
                            callback: Function) => {

    const canvas = html2canvas(el, {
        scale: 2, // 提高图像质量
    }).then((canvas) => {

            const imgData = canvas.toDataURL("image/png");
            const imgWidth = canvas.width / 10; // 转换为 mm，假设 1px = 0.1mm
            const imgHeight = canvas.height / 10;

            // 使用原始图像宽高生成自适应页面大小的 PDF
            const pdf = new JsPDF({
                orientation: imgWidth > imgHeight ? 'landscape' : 'portrait', // 根据图片大小自动选择横向或纵向
                unit: 'mm',
                format: [imgWidth, imgHeight] // 设置页面大小与图片大小一致
            });

            // 将图片添加到 PDF，X 和 Y 坐标为 0
            pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

            // 保存 PDF 文件
            pdf.save(pdfName);
        }
    );
};