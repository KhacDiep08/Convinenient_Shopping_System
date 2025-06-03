import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { fridgeProps, ingredientsProps } from '../../utils/interface/Interface';
import axios from 'axios';
import Url from '../../utils/url';
import { userInfo } from '../../utils/userInfo';
import ModalRemoveFridgeGroup from '../../components/modal/ModalRemoveFridgeGroup';
import './Fridge.css'; // Import CSS file for custom styles

function Fridge() {
    // const [fridge, setFridge] = useState<fridgeProps>({} as fridgeProps);
    // const [showModalRemoveFridgeGroup, setShowModalRemoveFridgeGroup] = useState(false);
    // const [currentIngredient, setCurrentIngredient] = useState<ingredientsProps>(
    //     {} as ingredientsProps,
    // );

    // useEffect(() => {
    //     const fetchApiGroupFridge = async () => {
    //         try {
    //             const results = await axios.get(Url(`fridge/user/3`));
    //             setFridge(results.data);
    //         } catch (error: any) {
    //             alert(error.response.data.message);
    //             console.log(error);
    //         }
    //     };
    //     fetchApiGroupFridge();
    // }, [showModalRemoveFridgeGroup]);

    // // Hàm tính trạng thái hạn sử dụng
    const calculateExpiryStatus = (createAt: any, exprided: any) => {
        // Xử lý ngày tháng - chuyển từ chuỗi sang đối tượng Date
        try {
            // Đảm bảo định dạng ngày tháng chính xác
            const createDate = new Date(createAt);
            const expiredDate = new Date(exprided);
            const currentDate = new Date();

            // Kiểm tra xem ngày có hợp lệ không
            if (isNaN(createDate.getTime()) || isNaN(expiredDate.getTime())) {
                console.error('Ngày không hợp lệ:', { createAt, exprided });
                return { status: "Không xác định", style: {}, daysLeft: null, tooltipText: "Không xác định ngày hết hạn" };
            }

            // Số ngày còn lại
            const daysLeft = Math.floor((expiredDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24) + 1);

            let tooltipText = "";

            if (daysLeft > 2) {
                tooltipText = `Nguyên liệu còn ${daysLeft} ngày nữa là hết hạn`;
                return { status: "Còn hạn", style: { backgroundColor: "transparent" }, daysLeft, tooltipText };
            } else if (daysLeft > 0) {
                tooltipText = `Nguyên liệu còn ${daysLeft} ngày nữa là hết hạn`;
                return { status: "Sắp hết hạn", style: { backgroundColor: "#FFEB3B" }, daysLeft, tooltipText };
            } else if (daysLeft === 0) {
                tooltipText = "Nguyên liệu hết hạn ngày hôm nay";
                return { status: "Sắp hết hạn", style: { backgroundColor: "#FFEB3B" }, daysLeft, tooltipText };
            } else {
                tooltipText = `Nguyên liệu đã hết hạn từ ${Math.abs(daysLeft)} ngày trước`;
                return { status: "Hết hạn", style: { backgroundColor: "#FF5252" }, daysLeft, tooltipText };
            }
        } catch (error) {
            console.error('Lỗi khi tính toán trạng thái hết hạn:', error);
            return { status: "Không xác định", style: {}, daysLeft: null, tooltipText: "Không xác định ngày hết hạn" };
        }
    };

    // Mock data cho ingredients
    const mockFridgeData = {
        ingredients: [
            {
                ingredient: {
                    name: "Thịt bò",
                    image: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=150&h=150&fit=crop"
                },
                quantity: 500,
                measure: "gram",
                createAt: "2024-05-15",
                exprided: "2024-06-10"
            },
            {
                ingredient: {
                    name: "Cà chua",
                    image: "https://images.unsplash.com/photo-1546470427-e26264be0b5d?w=150&h=150&fit=crop"
                },
                quantity: 3,
                measure: "quả",
                createAt: "2024-05-20",
                exprided: "2024-06-02"
            },
            {
                ingredient: {
                    name: "Sữa tươi",
                    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=150&h=150&fit=crop"
                },
                quantity: 1,
                measure: "lít",
                createAt: "2024-05-25",
                exprided: "2024-06-01"
            },
            {
                ingredient: {
                    name: "Trứng gà",
                    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=150&h=150&fit=crop"
                },
                quantity: 12,
                measure: "quả",
                createAt: "2024-05-18",
                exprided: "2024-06-15"
            },
            {
                ingredient: {
                    name: "Bánh mì",
                    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=150&h=150&fit=crop"
                },
                quantity: 2,
                measure: "ổ",
                createAt: "2024-05-28",
                exprided: "2024-05-30"
            },
            {
                ingredient: {
                    name: "Cơm",
                    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=150&h=150&fit=crop"
                },
                quantity: 3,
                measure: "chén",
                createAt: "2024-05-29",
                exprided: "2024-06-03"
            },
            {
                ingredient: {
                    name: "Xà lách",
                    image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=150&h=150&fit=crop"
                },
                quantity: 1,
                measure: "bó",
                createAt: "2024-05-31",
                exprided: "2024-06-08"
            }
        ]
    };

    // Thay thế fridge bằng mockFridgeData
    const fridge = mockFridgeData;

    return (
        <Table hover bordered>
            <thead className="fs-5 ">
                <tr>
                    <th>STT</th>
                    <th>Ảnh</th>
                    <th>Tên nguyên liệu</th>
                    <th>Số lượng</th>
                    <th>Đơn vị tính</th>
                    <th>Ngày cho vào tủ </th>
                    <th>Ngày hết hạn</th>
                    <th>Trạng thái</th>
                    <th>Sử dụng</th>
                </tr>
            </thead>
            <tbody>
                {fridge.ingredients?.map((item, index) => {
                    const { status, style, tooltipText } = calculateExpiryStatus(item.createAt, item.exprided);

                    return (
                        <tr
                            key={index}
                            style={{ ...style, backgroundColor: style.backgroundColor || '#f8f9fa' }}
                            className={
                                status === "Sắp hết hạn" ? "expiring-soon" :
                                    status === "Hết hạn" ? "expired" : ""
                            }
                            title={tooltipText}
                        >
                            <td style={{ ...style, backgroundColor: style.backgroundColor || '#f8f9fa' }}>{index + 1}</td>
                            <td style={{ ...style, backgroundColor: style.backgroundColor || '#f8f9fa' }}>
                                <img
                                    src={item.ingredient.image}
                                    alt="anh"
                                    style={{ height: '3rem', width: '3rem', objectFit: 'cover', borderRadius: '4px' }}
                                />
                            </td>
                            <td style={{ ...style, backgroundColor: style.backgroundColor || '#f8f9fa' }}>{item.ingredient.name}</td>
                            <td style={{ ...style, backgroundColor: style.backgroundColor || '#f8f9fa' }}>{item.quantity}</td>
                            <td style={{ ...style, backgroundColor: style.backgroundColor || '#f8f9fa' }}>{item.measure}</td>
                            <td style={{ ...style, backgroundColor: style.backgroundColor || '#f8f9fa' }}>
                                {new Date(item.createAt).toLocaleDateString('vi-VN')}
                            </td>
                            <td style={{ ...style, backgroundColor: style.backgroundColor || '#f8f9fa' }}>
                                {new Date(item.exprided).toLocaleDateString('vi-VN')}
                            </td>
                            <td style={{ ...style, backgroundColor: style.backgroundColor || '#f8f9fa' }}><strong>{status}</strong></td>
                            <td
                                style={{ ...style, backgroundColor: style.backgroundColor || '#f8f9fa', cursor: 'pointer' }}
                                // onClick={() => {
                                //     setCurrentIngredient(item);
                                //     setShowModalRemoveFridgeGroup(true);
                                // }}
                            >
                                <FontAwesomeIcon size="lg" icon={faRightFromBracket} />
                            </td>
                        </tr>
                    );
                })}

                {/* ModalRemoveFridgeGroup */}
                {/* {currentIngredient && (
                    <ModalRemoveFridgeGroup
                        show={showModalRemoveFridgeGroup}
                        hide={() => setShowModalRemoveFridgeGroup(false)}
                        ingredient={currentIngredient}
                    />
                )} */}
            </tbody>
        </Table>
    );
}

export default Fridge;