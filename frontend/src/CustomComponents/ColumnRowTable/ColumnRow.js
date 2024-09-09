
import './columnrow.css';
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";


function ColumnRow({ columns, rows, handleAction }) {

  return (
    <div className='mytable' >
      <div style={{ width: '100%' }} >
        {/* <table style={{ borderCollapse: 'collapse', width: '100%' }} > */}
        <table style={{ width: '100%' }} >
          <thead>
            <tr style={{ display: 'flex' }} >
              {columns.map((item, index) => {
                return <th style={{ flex: item.flex, minWidth: `${item.minWidth}px` }} key={index} >
                  {item.headerName}
                </th>
              })}
            </tr>
          </thead>

          <tbody>

            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} style={{ display: 'flex' }}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex} style={{ flex: column.flex }}>
                    {column.field === 'actions' ? (
                      <div className="actions">
                        {column.actions.map((action, actionIndex) => (
                          <Link
                          key={actionIndex}
                          onClick={() =>  (action.type==="delete") ?  handleAction(row.id) : console.log("hiii")  }
                          to={action.link ? `${action.link}/${row.id}` : '#'}
                          >
                            {action.type === 'edit' ? <FaEdit /> : <AiFillDelete />}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      row[column.field] // Display other column values (id, name, etc.)
                    )}
                  </td>
                ))}
              </tr>
            ))}


          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ColumnRow;
