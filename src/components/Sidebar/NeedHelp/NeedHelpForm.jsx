import { useForm } from 'react-hook-form';

const NeedHelpForm = () => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
      <div style={fieldStyle}>
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          {...register('email', { required: true })}
          style={inputStyle}
        />
        {errors.email && <span style={errorStyle}>This field is required</span>}
      </div>

      <div style={fieldStyle}>
        <label htmlFor="comment">Comment</label>
        <textarea
          id="comment"
          placeholder="Enter your comment"
          {...register('comment', { required: true })}
          style={{ ...inputStyle, height: '100px' }}
        />
        {errors.comment && (
          <span style={errorStyle}>This field is required</span>
        )}
      </div>

      <button type="submit" style={buttonStyle}>
        Submit
      </button>
    </form>
  );
};

export default NeedHelpForm;
