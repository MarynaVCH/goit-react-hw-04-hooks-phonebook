import PropTypes from 'prop-types';

export default function Filter({ value, id, onChangeFilter }) {
  return (
    <>
      <label htmlFor={id}>Find contacts by name</label>
      <input
        type="text"
        value={value}
        id={id}
        onChange={e => onChangeFilter(e.target.value)}
      />
    </>
  );
}

Filter.propTypes = {
  value: PropTypes.string,
  id: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};
